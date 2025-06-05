
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
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
import { collection, getDocs, onSnapshot, query, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import RiskFormDialog, { Risk as RiskType } from "@/components/risks/RiskFormDialog";
import RiskDeleteDialog from "@/components/risks/RiskDeleteDialog";
import { Skeleton } from "@/components/ui/skeleton";

// Types pour les risques
interface Risk {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  system: string;
  type: string;
  date: string;
  responsible: string;
  status: "new" | "in-progress" | "mitigated";
  createdAt?: Timestamp;
}

const RisksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les risques depuis Firestore
  useEffect(() => {
    const q = query(collection(db, "risks"));
    
    // Utiliser onSnapshot pour les mises à jour en temps réel
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const risksData: Risk[] = [];
        querySnapshot.forEach((doc) => {
          risksData.push({
            id: doc.id,
            ...(doc.data() as Omit<Risk, "id">),
          });
        });
        setRisks(risksData);
        setLoading(false);
      },
      (error) => {
        console.error("Erreur lors du chargement des risques:", error);
        setLoading(false);
      }
    );

    // Nettoyer l'abonnement lorsque le composant est démonté
    return () => unsubscribe();
  }, []);

  // Fonction pour filtrer les risques
  const filteredRisks = risks.filter((risk) => {
    return (
      risk.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterSeverity === "all" || risk.severity === filterSeverity) &&
      (filterStatus === "all" || risk.status === filterStatus)
    );
  });

  // Fonction pour rafraîchir les risques (utilisée après ajout/suppression)
  const refreshRisks = () => {
    // La mise à jour est automatique grâce à onSnapshot
  };

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
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Registre des risques</h1>
            <p className="text-muted-foreground">
              Gérez et suivez tous les risques informatiques identifiés
            </p>
          </div>
          <RiskFormDialog onRiskAdded={refreshRisks} />
        </div>

        <Card>
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Liste des risques</CardTitle>
                <CardDescription>
                  {filteredRisks.length} risque(s) trouvé(s)
                </CardDescription>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <Input
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="md:w-[200px]"
                />
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger className="md:w-[150px]">
                    <SelectValue placeholder="Sévérité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les sévérités</SelectItem>
                    <SelectItem value="critical">Critique</SelectItem>
                    <SelectItem value="high">Élevé</SelectItem>
                    <SelectItem value="medium">Moyen</SelectItem>
                    <SelectItem value="low">Faible</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="md:w-[150px]">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="new">Nouveau</SelectItem>
                    <SelectItem value="in-progress">En cours</SelectItem>
                    <SelectItem value="mitigated">Mitigé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium">Nom</th>
                    <th className="p-4 text-left font-medium">Sévérité</th>
                    <th className="p-4 text-left font-medium">Système</th>
                    <th className="p-4 text-left font-medium">Type</th>
                    <th className="p-4 text-left font-medium">Date</th>
                    <th className="p-4 text-left font-medium">Responsable</th>
                    <th className="p-4 text-left font-medium">Statut</th>
                    <th className="p-4 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Afficher des skeletons pendant le chargement
                    Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4">
                            <Skeleton className="h-6 w-[200px]" />
                          </td>
                          <td className="p-4">
                            <Skeleton className="h-6 w-[80px]" />
                          </td>
                          <td className="p-4">
                            <Skeleton className="h-6 w-[120px]" />
                          </td>
                          <td className="p-4">
                            <Skeleton className="h-6 w-[100px]" />
                          </td>
                          <td className="p-4">
                            <Skeleton className="h-6 w-[80px]" />
                          </td>
                          <td className="p-4">
                            <Skeleton className="h-6 w-[150px]" />
                          </td>
                          <td className="p-4">
                            <Skeleton className="h-6 w-[80px]" />
                          </td>
                          <td className="p-4">
                            <Skeleton className="h-6 w-[40px]" />
                          </td>
                        </tr>
                      ))
                  ) : filteredRisks.length > 0 ? (
                    filteredRisks.map((risk) => (
                      <tr key={risk.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div>
                            <Link
                              to={`/dashboard/risks/${risk.id}`}
                              className="text-primary hover:underline font-medium"
                            >
                              {risk.name}
                            </Link>
                            <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                              {risk.description}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">{getSeverityBadge(risk.severity)}</td>
                        <td className="p-4">{risk.system}</td>
                        <td className="p-4">{risk.type}</td>
                        <td className="p-4">{new Date(risk.date).toLocaleDateString()}</td>
                        <td className="p-4">{risk.responsible}</td>
                        <td className="p-4">{getStatusBadge(risk.status)}</td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <RiskDeleteDialog
                              riskId={risk.id}
                              riskName={risk.name}
                              onRiskDeleted={refreshRisks}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-muted-foreground">
                        Aucun risque trouvé. Ajoutez-en un nouveau pour commencer.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RisksPage;
