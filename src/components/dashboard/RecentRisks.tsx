
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Types pour les risques
interface Risk {
  id: number;
  name: string;
  severity: "critical" | "high" | "medium" | "low";
  system: string;
  date: string;
  status: "new" | "in-progress" | "mitigated";
}

const RecentRisks: React.FC = () => {
  // Risques fictifs récents
  const recentRisks: Risk[] = [
    {
      id: 1,
      name: "Attaque par ransomware",
      severity: "critical",
      system: "Serveurs de fichiers",
      date: "2023-05-10",
      status: "new",
    },
    {
      id: 2,
      name: "Fuite de données clients",
      severity: "high",
      system: "Base de données",
      date: "2023-05-08",
      status: "in-progress",
    },
    {
      id: 3,
      name: "Vulnérabilité non patchée",
      severity: "medium",
      system: "Applications web",
      date: "2023-05-05",
      status: "in-progress",
    },
    {
      id: 4,
      name: "Accès non autorisé",
      severity: "high",
      system: "VPN",
      date: "2023-05-03",
      status: "mitigated",
    },
    {
      id: 5,
      name: "Phishing réussi",
      severity: "critical",
      system: "Emails",
      date: "2023-05-01",
      status: "in-progress",
    },
  ];

  // Fonction pour obtenir la couleur du badge en fonction de la sévérité
  const getSeverityBadge = (severity: Risk["severity"]) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critique</Badge>;
      case "high":
        return <Badge variant="default" className="bg-orange-500">Élevé</Badge>;
      case "medium":
        return <Badge variant="default" className="bg-yellow-500">Moyen</Badge>;
      case "low":
        return <Badge variant="default" className="bg-green-500">Faible</Badge>;
    }
  };

  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: Risk["status"]) => {
    switch (status) {
      case "new":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Nouveau</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="border-amber-500 text-amber-500">En cours</Badge>;
      case "mitigated":
        return <Badge variant="outline" className="border-green-500 text-green-500">Mitigé</Badge>;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
        <CardTitle>Risques récents</CardTitle>
        <Link to="/dashboard/risks">
          <Button variant="ghost" size="sm">
            Voir tous
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-medium">Nom</th>
                <th className="p-4 text-left font-medium">Sévérité</th>
                <th className="p-4 text-left font-medium">Système</th>
                <th className="p-4 text-left font-medium">Date</th>
                <th className="p-4 text-left font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {recentRisks.map((risk) => (
                <tr key={risk.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <Link
                      to={`/dashboard/risks/${risk.id}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {risk.name}
                    </Link>
                  </td>
                  <td className="p-4">{getSeverityBadge(risk.severity)}</td>
                  <td className="p-4">{risk.system}</td>
                  <td className="p-4">{new Date(risk.date).toLocaleDateString()}</td>
                  <td className="p-4">{getStatusBadge(risk.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentRisks;
