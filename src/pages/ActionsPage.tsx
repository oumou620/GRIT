import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ActionFormDialog from "@/components/actions/ActionFormDialog";

// Types pour les plans d'action
interface Action {
  id: string;
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

const ActionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [actions, setActions] = useState<Action[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupération des plans d'action depuis Firestore
  useEffect(() => {
    const fetchActions = async () => {
      setLoading(true);
      try {
        const actionsQuery = query(
          collection(db, "actions"),
          orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(actionsQuery, (snapshot) => {
          const actionsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Action[];
          setActions(actionsData);
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Erreur lors de la récupération des plans d'action:", error);
        setLoading(false);
      }
    };

    fetchActions();
  }, []);

  // Fonction pour rafraîchir la liste des actions
  const refreshActions = () => {
    const fetchActions = async () => {
      try {
        const actionsQuery = query(
          collection(db, "actions"),
          orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(actionsQuery, (snapshot) => {
          const actionsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Action[];
          setActions(actionsData);
        });

        return unsubscribe;
      } catch (error) {
        console.error("Erreur lors de la récupération des plans d'action:", error);
      }
    };

    fetchActions();
  };

  // Filtrer les actions en fonction du terme de recherche et du statut
  const filteredActions = actions.filter((action) => {
    const matchesSearch = action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (action.riskName && action.riskName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === "all" || action.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Fonction pour obtenir le badge approprié en fonction du statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo":
        return <Badge variant="outline">À faire</Badge>;
      case "in-progress":
        return <Badge variant="secondary">En cours</Badge>;
      case "completed":
        return <Badge>Terminé</Badge>;
      case "canceled":
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Plans d'action</h1>
            <p className="text-muted-foreground">
              Gérez et suivez les actions de mitigation des risques
            </p>
          </div>
          <div>
            {/* Utilisation du composant ActionFormDialog pour gérer l'ajout d'action */}
            <ActionFormDialog onActionAdded={refreshActions} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des plans d'action</CardTitle>
            <CardDescription>
              Visualisez et filtrez tous les plans d'action définis
            </CardDescription>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <div className="w-full sm:w-1/2">
                <Input
                  placeholder="Rechercher un plan d'action..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full sm:w-1/3">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="todo">À faire</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="canceled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredActions.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  Aucun plan d'action trouvé. Ajoutez-en un nouveau pour commencer.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 font-medium">Nom</th>
                      <th className="text-left py-3 font-medium">Risque associé</th>
                      <th className="text-left py-3 font-medium">Responsable</th>
                      <th className="text-left py-3 font-medium">Date limite</th>
                      <th className="text-left py-3 font-medium">Statut</th>
                      <th className="text-right py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActions.map((action) => (
                      <tr key={action.id} className="border-b hover:bg-muted/50">
                        <td className="py-3">
                          <Link
                            to={`/dashboard/actions/${action.id}`}
                            className="font-medium hover:underline"
                          >
                            {action.name}
                          </Link>
                        </td>
                        <td className="py-3">{action.riskName}</td>
                        <td className="py-3">{action.responsible}</td>
                        <td className="py-3">{action.deadline}</td>
                        <td className="py-3">{getStatusBadge(action.status)}</td>
                        <td className="py-3 text-right">
                          <Link
                            to={`/dashboard/actions/${action.id}`}
                            className="text-primary hover:underline text-sm"
                          >
                            Détails
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ActionsPage;
