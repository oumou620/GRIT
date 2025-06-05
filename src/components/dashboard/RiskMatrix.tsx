
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Définition des niveaux d'impact et de probabilité
const impactLevels = [
  { value: 1, label: "Très faible" },
  { value: 2, label: "Faible" },
  { value: 3, label: "Moyen" },
  { value: 4, label: "Élevé" },
  { value: 5, label: "Critique" },
];

const probabilityLevels = [
  { value: 1, label: "Rare" },
  { value: 2, label: "Peu probable" },
  { value: 3, label: "Possible" },
  { value: 4, label: "Probable" },
  { value: 5, label: "Très probable" },
];

// Interface pour les risques provenant de Firebase
interface Risk {
  id: string;
  name: string;
  description: string;
  system: string;
  type: string;
  impact: number;
  probability: number;
  severity: string;
  date: string;
  responsible: string;
  status: string;
}

// Fonction pour déterminer la couleur en fonction du score de risque
const getRiskColor = (impact: number, probability: number) => {
  const score = impact * probability;
  if (score >= 20) return "bg-gradient-to-br from-red-700 to-red-900 text-white shadow-md";
  if (score >= 15) return "bg-gradient-to-br from-red-500 to-red-700 text-white shadow-md";
  if (score >= 10) return "bg-gradient-to-br from-orange-500 to-orange-700 text-white shadow-md";
  if (score >= 5) return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-md";
  return "bg-gradient-to-br from-green-400 to-green-600 text-black shadow-md";
};

const RiskMatrix: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [risks, setRisks] = useState<Risk[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les risques depuis Firebase
  useEffect(() => {
    const q = query(collection(db, "risks"));
    
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const risksData: Risk[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Conversion des champs impact et probability en nombres si ce sont des strings
          const impact = typeof data.impact === 'string' ? parseInt(data.impact, 10) : data.impact || 3;
          const probability = typeof data.probability === 'string' ? parseInt(data.probability, 10) : data.probability || 3;
          
          risksData.push({
            id: doc.id,
            ...data,
            impact,
            probability,
          } as Risk);
        });
        setRisks(risksData);
        setLoading(false);
      },
      (error) => {
        console.error("Erreur lors du chargement des risques:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Filtrage des risques
  const filteredRisks = risks.filter((risk) => {
    return (
      (selectedSystem === "all" || risk.system === selectedSystem) &&
      (selectedType === "all" || risk.type === selectedType)
    );
  });

  // Extraction des systèmes et types uniques pour les filtres
  const systems = Array.from(new Set(risks.map((risk) => risk.system)));
  const types = Array.from(new Set(risks.map((risk) => risk.type)));

  // Création de la matrice
  const renderMatrix = () => {
    return (
      <div className="mt-6 overflow-x-auto pb-2">
        <table className="w-full border-collapse min-w-[700px] table-fixed rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-medium"></th>
              {/* En-têtes des colonnes - Probabilité */}
              {probabilityLevels.map((prob) => (
                <th key={prob.value} className="p-3 text-center font-medium border-b-2 border-gray-200">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-500">Probabilité</span>
                    <span className="font-bold">{prob.label}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Lignes de la matrice - Impact */}
            {/* Nous commençons par l'impact le plus élevé en haut */}
            {impactLevels
              .slice()
              .reverse()
              .map((impact, rowIndex) => (
                <tr key={impact.value}>
                  {/* En-tête de la ligne - Impact */}
                  <th className="p-3 text-left font-medium whitespace-nowrap border-r-2 border-gray-200 bg-gray-100">
                    {rowIndex === 2 && (
                      <div className="absolute -left-6 transform rotate-90 font-bold text-gray-500">
                        Impact
                      </div>
                    )}
                    <span className="font-bold">{impact.label}</span>
                  </th>
                  {/* Cellules de la matrice */}
                  {probabilityLevels.map((prob) => {
                    const cellRisks = filteredRisks.filter(
                      (risk) => risk.impact === impact.value && risk.probability === prob.value
                    );
                    const score = impact.value * prob.value;
                    return (
                      <td
                        key={`${impact.value}-${prob.value}`}
                        className={`${getRiskColor(impact.value, prob.value)} p-4 text-center h-24 w-[18%] border border-white relative rounded-md m-1 transition-all duration-200 ${
                          cellRisks.length > 0 ? "cursor-pointer hover:scale-105 hover:z-10" : ""
                        }`}
                        title={`Impact: ${impact.label}, Probabilité: ${prob.label}, Score: ${score}`}
                      >
                        <div className="absolute top-1 right-2 opacity-70 font-mono text-xs">{score}</div>
                        {cellRisks.length > 0 ? (
                          <div className="flex flex-col items-center justify-center">
                            <span className="font-bold text-2xl">{cellRisks.length}</span>
                            <span className="text-sm">{cellRisks.length > 1 ? "risques" : "risque"}</span>
                            {cellRisks.length <= 2 && (
                              <div className="mt-1 text-xs max-w-[150px] truncate">
                                {cellRisks.map(risk => risk.name).join(", ")}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="opacity-50">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-200 border-b">
        <CardTitle className="text-xl font-bold flex items-center">
          <svg className="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Matrice d'Évaluation des Risques
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="system-filter">Filtrer par système</Label>
            <Select value={selectedSystem} onValueChange={setSelectedSystem}>
              <SelectTrigger id="system-filter" className="mt-1">
                <SelectValue placeholder="Tous les systèmes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les systèmes</SelectItem>
                {systems.map((system) => (
                  <SelectItem key={system} value={system}>
                    {system}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="type-filter">Filtrer par type</Label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger id="type-filter" className="mt-1">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-4 justify-center p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 mr-2 rounded-md shadow-sm"></div>
              <span className="text-sm font-medium">Faible (1-4)</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 mr-2 rounded-md shadow-sm"></div>
              <span className="text-sm font-medium">Moyen (5-9)</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-700 mr-2 rounded-md shadow-sm"></div>
              <span className="text-sm font-medium">Élevé (10-14)</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 mr-2 rounded-md shadow-sm"></div>
              <span className="text-sm font-medium">Critique (15-19)</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gradient-to-br from-red-700 to-red-900 mr-2 rounded-md shadow-sm"></div>
              <span className="text-sm font-medium">Extrême (20-25)</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          renderMatrix()
        )}

        <div className="mt-6 flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-100">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">
              {filteredRisks.length === 0 
                ? "Aucun risque à afficher avec les filtres actuels." 
                : `La matrice affiche ${filteredRisks.length} risque${filteredRisks.length > 1 ? 's' : ''} selon les filtres appliqués.`}
            </p>
          </div>
          {filteredRisks.length > 0 && (
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Survolez les cellules pour plus de détails
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskMatrix;
