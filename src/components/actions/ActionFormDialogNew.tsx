import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";
import AIAssistant from "@/components/ai/AIAssistant";

// Type pour les actions
export interface Action {
  id?: string;
  name: string;
  description: string;
  riskId: string;
  riskName: string;
  cost: string;
  deadline: string;
  responsible: string;
  status: "todo" | "in-progress" | "completed" | "canceled";
  signature?: {
    signedBy?: string;
    date?: string;
    comment?: string;
  };
  createdAt?: Date;
}

// Type pour les risques
interface Risk {
  id: string;
  name: string;
}

interface ActionFormDialogProps {
  onActionAdded: () => void;
}

const ActionFormDialogNew: React.FC<ActionFormDialogProps> = ({ onActionAdded }) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [risks, setRisks] = useState<Risk[]>([]);
  const [formData, setFormData] = useState<Omit<Action, "id">>({
    name: "",
    description: "",
    riskId: "",
    riskName: "",
    cost: "",
    deadline: new Date().toISOString().split("T")[0],
    responsible: "",
    status: "todo",
  });

  // Charger les risques depuis Firebase
  useEffect(() => {
    if (open) {
      const fetchRisks = async () => {
        try {
          console.log("Chargement des risques...");
          const risksSnapshot = await getDocs(collection(db, "risks"));
          const risksData = risksSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }));
          setRisks(risksData);
          console.log("Risques chargés:", risksData);
        } catch (error) {
          console.error("Erreur lors de la récupération des risques:", error);
          toast.error("Erreur lors de la récupération des risques");
        }
      };
      fetchRisks();
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "riskId") {
      // Trouver le nom du risque sélectionné
      const selectedRisk = risks.find(risk => risk.id === value);
      setFormData((prev) => ({ 
        ...prev, 
        riskId: value,
        riskName: selectedRisk ? selectedRisk.name : ""
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!formData.name || !formData.description || !formData.riskId || !formData.responsible) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Ajout du plan d'action à Firestore
      await addDoc(collection(db, "actions"), {
        ...formData,
        createdAt: new Date(),
      });
      
      toast.success("Plan d'action ajouté avec succès");
      setOpen(false);
      setFormData({
        name: "",
        description: "",
        riskId: "",
        riskName: "",
        cost: "",
        deadline: new Date().toISOString().split("T")[0],
        responsible: "",
        status: "todo",
      });
      
      // Notifier le composant parent que le plan d'action a été ajouté
      onActionAdded();
    } catch (error) {
      console.error("Erreur lors de l'ajout du plan d'action:", error);
      toast.error("Erreur lors de l'ajout du plan d'action");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <svg
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Ajouter un plan d'action
      </Button>

      <Dialog 
        open={open} 
        onOpenChange={(newOpen) => {
          // Empêcher le comportement par défaut et seulement mettre à jour l'état
          if (!newOpen) {
            setOpen(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="py-2">
            <DialogHeader className="pb-2">
              <DialogTitle>Ajouter un nouveau plan d'action</DialogTitle>
              <DialogDescription className="text-sm">
                Complétez les informations du plan d'action à ajouter.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-2">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom*
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Mise à jour des antivirus, Formation phishing..."
                  className="col-span-3"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description*
                </Label>
                <div className="col-span-3 space-y-4">
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Décrivez en détail les actions à entreprendre..."
                    className="w-full"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  
                  {/* Ajouter l'assistant IA pour générer des suggestions d'actions */}
                  {formData.riskId && formData.riskName && (
                    <AIAssistant 
                      mode="suggest" 
                      inputText={`Risque: ${formData.riskName}`}
                      onSuggestionSelect={(suggestion) => {
                        setFormData(prev => ({
                          ...prev,
                          description: suggestion
                        }));
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="riskId" className="text-right">
                  Risque associé*
                </Label>
                <Select
                  value={formData.riskId}
                  onValueChange={(value) => handleSelectChange("riskId", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Sélectionner un risque" />
                  </SelectTrigger>
                  <SelectContent>
                    {risks.length > 0 ? (
                      risks.map((risk) => (
                        <SelectItem key={risk.id} value={risk.id}>
                          {risk.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="" disabled>
                        Aucun risque disponible
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="responsible" className="text-right">
                  Responsable*
                </Label>
                <Input
                  id="responsible"
                  name="responsible"
                  placeholder="Nom de la personne responsable"
                  className="col-span-3"
                  value={formData.responsible}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">
                  Coût estimé
                </Label>
                <Input
                  id="cost"
                  name="cost"
                  placeholder="Ex: 5000€"
                  className="col-span-3"
                  value={formData.cost}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Date limite
                </Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  className="col-span-3"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Statut
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value as Action["status"])}
                >
                  <SelectTrigger className="col-span-3">
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
            <DialogFooter className="mt-6 border-t pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="mr-2"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 text-white font-medium"
              >
                {isSubmitting ? "Ajout en cours..." : "Ajouter le plan d'action"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionFormDialogNew;
