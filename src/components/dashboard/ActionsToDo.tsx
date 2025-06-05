
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Types pour les actions
interface Action {
  id: number;
  name: string;
  dueDate: string;
  responsible: string;
  risk: string;
  status: "pending" | "in-progress" | "completed" | "late";
}

const ActionsToDo: React.FC = () => {
  // Actions fictives à faire
  const actions: Action[] = [
    {
      id: 1,
      name: "Mise à jour des antivirus",
      dueDate: "2023-05-15",
      responsible: "Thomas Martin",
      risk: "Attaque par ransomware",
      status: "pending",
    },
    {
      id: 2,
      name: "Formation phishing",
      dueDate: "2023-05-12",
      responsible: "Sophie Bernard",
      risk: "Phishing réussi",
      status: "in-progress",
    },
    {
      id: 3,
      name: "Audit des accès VPN",
      dueDate: "2023-05-08",
      responsible: "Alexandre Dupont",
      risk: "Accès non autorisé",
      status: "late",
    },
    {
      id: 4,
      name: "Backup des données clients",
      dueDate: "2023-05-20",
      responsible: "Julie Lefebvre",
      risk: "Fuite de données clients",
      status: "in-progress",
    },
  ];

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: Action["status"], dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    
    switch (status) {
      case "pending":
        return due < today ? 
          <Badge variant="destructive">En retard</Badge> : 
          <Badge variant="outline" className="border-blue-500 text-blue-500">À faire</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">En cours</Badge>;
      case "completed":
        return <Badge variant="outline" className="border-green-500 text-green-500">Terminé</Badge>;
      case "late":
        return <Badge variant="destructive">En retard</Badge>;
    }
  };

  // Fonction pour formater les dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
        <CardTitle>Actions à réaliser</CardTitle>
        <Link to="/dashboard/actions">
          <Button variant="ghost" size="sm">
            Voir toutes
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-medium">Action</th>
                <th className="p-4 text-left font-medium">Échéance</th>
                <th className="p-4 text-left font-medium">Responsable</th>
                <th className="p-4 text-left font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {actions.map((action) => (
                <tr key={action.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <Link
                        to={`/dashboard/actions/${action.id}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {action.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        Risque: {action.risk}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">{formatDate(action.dueDate)}</td>
                  <td className="p-4">{action.responsible}</td>
                  <td className="p-4">{getStatusBadge(action.status, action.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionsToDo;
