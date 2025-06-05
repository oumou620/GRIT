import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import ActionSignatureDialog from "@/components/actions/ActionSignatureDialog";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface Action {
  id: string;
  name: string;
  description: string;
  deadline: string;
  responsible: string;
  riskId: string;
  riskName: string;
  cost: string;
  status: "todo" | "in-progress" | "completed" | "canceled";
  signature?: {
    signedBy?: string;
    date?: string;
    comment?: string;
  };
  createdAt?: Date;
}

interface Risk {
  id: string;
  name: string;
  severity: string;
  impact: number;
  probability: number;
}

const ActionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [action, setAction] = useState<Action | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Action>>({});

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: Action["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">À faire</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">En cours</Badge>;
      case "completed":
        return <Badge variant="outline" className="border-green-500 text-green-500">Terminé</Badge>;
      case "late":
        return <Badge variant="destructive">En retard</Badge>;
      default:
        return null;
    }
  };

  useEffect(() => {
    // Récupérer les données réelles de l'action depuis Firestore
    const fetchAction = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const actionRef = doc(db, "actions", id);
        const actionSnap = await getDoc(actionRef);
        
        if (actionSnap.exists()) {
          const actionData = {
            id: actionSnap.id,
            ...actionSnap.data()
          } as Action;
          
          setAction(actionData);
          setFormData(actionData);
          
          // Récupérer les détails du risque associé
          if (actionData.riskId) {
            const riskRef = doc(db, "risks", actionData.riskId);
            const riskSnap = await getDoc(riskRef);
            
            if (riskSnap.exists()) {
              const riskData = {
                id: riskSnap.id,
                ...riskSnap.data()
              } as Risk;
              
              // Vous pouvez faire quelque chose avec les données du risque si nécessaire
              console.log("Données du risque associé:", riskData);
            }
          }
        } else {
          toast.error("Action non trouvée");
          navigate("/dashboard/actions");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'action:", error);
        toast.error("Impossible de charger les détails de l'action");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAction();
  }, [id, navigate]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simuler l'enregistrement des modifications
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setAction(prev => ({ ...prev, ...formData } as Action));
      setIsEditing(false);
      toast.success("Action mise à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Impossible de mettre à jour l'action");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: Action["status"]) => {
    if (!action || !action.id) return;
    
    try {
      setIsLoading(true);
      
      // Mettre à jour le statut dans Firestore
      const actionRef = doc(db, "actions", action.id);
      await updateDoc(actionRef, {
        status: newStatus
      });
      
      setAction(prev => ({ ...prev, status: newStatus } as Action));
      
      const statusLabel = 
        newStatus === "completed" ? "Terminé" : 
        newStatus === "in-progress" ? "En cours" : 
        newStatus === "canceled" ? "Annulé" : "À faire";
        
      toast.success(`Statut mis à jour: ${statusLabel}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Impossible de mettre à jour le statut");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fonction pour rafraîchir les données de l'action après signature
  const refreshActionAfterSignature = async () => {
    if (!action || !action.id) return;
    
    try {
      const actionRef = doc(db, "actions", action.id);
      const actionSnap = await getDoc(actionRef);
      
      if (actionSnap.exists()) {
        const actionData = {
          id: actionSnap.id,
          ...actionSnap.data()
        } as Action;
        
        setAction(actionData);
        setFormData(actionData);
      }
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des données:", error);
    }
  };

  // Format de date pour l'affichage
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (isLoading && !action) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Détails de l'action</h1>
            <p className="text-muted-foreground">
              Gérer et suivre l'avancement de cette action
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate("/dashboard/actions")}>
              Retour à la liste
            </Button>
          </div>
        </div>

        {action && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{isEditing ? "Modifier l'action" : "Détails de l'action"}</CardTitle>
              {!isEditing && (
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Modifier
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom de l'action</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description || ""}
                      onChange={handleFormChange}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Date d'échéance</Label>
                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={formData.deadline || ""}
                        onChange={handleFormChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="responsible">Responsable</Label>
                      <Input
                        id="responsible"
                        name="responsible"
                        value={formData.responsible || ""}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="riskName">Risque associé</Label>
                      <Input
                        id="riskName"
                        name="riskName"
                        value={formData.riskName || ""}
                        onChange={handleFormChange}
                        disabled
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status">Statut</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todo">À faire</SelectItem>
                          <SelectItem value="in-progress">En cours</SelectItem>
                          <SelectItem value="completed">Terminé</SelectItem>
                          <SelectItem value="canceled">Annulé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Description</h3>
                    <p className="text-gray-600 mt-1">{action.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Date d'échéance</h3>
                      <p className="mt-1">{formatDate(action.deadline)}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Responsable</h3>
                      <p className="mt-1">{action.responsible}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Risque associé</h3>
                      <p className="mt-1">{action.riskName}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Statut actuel</h3>
                      <div className="mt-1">{getStatusBadge(action.status)}</div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Coût estimé</h3>
                      <p className="mt-1">{action.cost || "Non spécifié"}</p>
                    </div>
                    
                    {action.signature && (
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Signature</h3>
                        <div className="mt-1 flex items-center">
                          <svg
                            className="h-4 w-4 mr-1 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-sm font-medium">{action.signature.signedBy}</span>
                          <span className="text-xs text-gray-500 ml-1">({formatDate(action.signature.date || "")})</span>
                        </div>
                        {action.signature.comment && (
                          <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
                            {action.signature.comment}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                  </Button>
                </>
              ) : (
                <div className="flex space-x-2 w-full">
                  {action.status !== "completed" ? (
                    <>
                      <Button 
                        variant={action.status === "todo" ? "default" : "outline"} 
                        className="flex-1"
                        onClick={() => handleStatusChange("in-progress")}
                        disabled={action.status === "completed"}
                      >
                        Démarrer
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleStatusChange("todo")}
                        disabled={action.status === "completed"}
                      >
                        Mettre en attente
                      </Button>
                      <ActionSignatureDialog 
                        actionId={action.id}
                        actionName={action.name}
                        onActionSigned={refreshActionAfterSignature}
                        triggerButton={
                          <Button 
                            variant="outline" 
                            className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 border-green-200"
                            disabled={action.status === "completed"}
                          >
                            Signer comme terminé
                          </Button>
                        }
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-center w-full p-3 bg-green-50 rounded-md border border-green-200">
                      <svg
                        className="h-5 w-5 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-green-800 font-medium">Cette action a été marquée comme terminée</span>
                    </div>
                  )}
                </div>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ActionDetailPage;
