
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartLine, ChartColumnBig, ChartPie } from "lucide-react";

// Types pour les données des graphiques
interface DataPoint {
  name: string;
  value: number;
  value2?: number;
}

const UserActivityCharts: React.FC = () => {
  const [hoveredChart, setHoveredChart] = useState<string | null>(null);
  
  // Données pour le graphique d'activité
  const activityData: DataPoint[] = [
    { name: "Lun", value: 25 },
    { name: "Mar", value: 34 },
    { name: "Mer", value: 28 },
    { name: "Jeu", value: 42 },
    { name: "Ven", value: 38 },
    { name: "Sam", value: 12 },
    { name: "Dim", value: 8 },
  ];

  // Données pour le graphique de rôles
  const roleData: DataPoint[] = [
    { name: "Administrateurs", value: 3 },
    { name: "Gestionnaires", value: 8 },
    { name: "Analystes", value: 15 },
    { name: "Utilisateurs", value: 24 },
  ];

  // Données pour le graphique de contributions
  const contributionData: DataPoint[] = [
    { name: "Risques ajoutés", value: 45 },
    { name: "Actions créées", value: 65 },
    { name: "Commentaires", value: 85 },
    { name: "Rapports générés", value: 25 },
  ];

  // Couleurs pour le graphique circulaire
  const COLORS = ["#8b5cf6", "#d946ef", "#f97316", "#0ea5e9"];

  // Configuration pour les graphiques
  const chartConfig = {
    activity: {
      connexions: {
        label: "Connexions",
        theme: {
          light: "#3182ce",
          dark: "#4299e1",
        },
      },
    },
    role: {
      administrateurs: {
        label: "Administrateurs",
        theme: {
          light: "#8b5cf6",
          dark: "#a78bfa",
        },
      },
      gestionnaires: {
        label: "Gestionnaires",
        theme: {
          light: "#d946ef",
          dark: "#e879f9",
        },
      },
      analystes: {
        label: "Analystes",
        theme: {
          light: "#f97316",
          dark: "#fb923c",
        },
      },
      utilisateurs: {
        label: "Utilisateurs",
        theme: {
          light: "#0ea5e9",
          dark: "#38bdf8",
        },
      },
    },
    contribution: {
      contributions: {
        label: "Contributions",
        theme: {
          light: "#4c51bf",
          dark: "#667eea",
        },
      },
    },
  };

  // Fonction pour gérer la surbrillance du graphe actif
  const handleMouseEnter = (chartId: string) => {
    setHoveredChart(chartId);
  };

  const handleMouseLeave = () => {
    setHoveredChart(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Activité des utilisateurs</h2>
      
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <ChartLine className="h-4 w-4" />
            <span>Activité</span>
          </TabsTrigger>
          <TabsTrigger value="role" className="flex items-center gap-2">
            <ChartPie className="h-4 w-4" />
            <span>Rôles</span>
          </TabsTrigger>
          <TabsTrigger value="contribution" className="flex items-center gap-2">
            <ChartColumnBig className="h-4 w-4" />
            <span>Contributions</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activité de connexion hebdomadaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-80" 
                onMouseEnter={() => handleMouseEnter('activity')} 
                onMouseLeave={handleMouseLeave}
              >
                <ChartContainer config={chartConfig.activity}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="connexions" 
                        stroke="var(--color-connexions, #3182ce)" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        isAnimationActive={hoveredChart === 'activity'}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="role">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des rôles d'utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-80"
                onMouseEnter={() => handleMouseEnter('role')} 
                onMouseLeave={handleMouseLeave}
              >
                <ChartContainer config={chartConfig.role}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={roleData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={2}
                        isAnimationActive={hoveredChart === 'role'}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                      >
                        {roleData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contribution">
          <Card>
            <CardHeader>
              <CardTitle>Contributions par type</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-80" 
                onMouseEnter={() => handleMouseEnter('contribution')} 
                onMouseLeave={handleMouseLeave}
              >
                <ChartContainer config={chartConfig.contribution}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value"
                        name="contributions"
                        fill="var(--color-contributions, #4c51bf)"
                        radius={[4, 4, 0, 0]}
                        isAnimationActive={hoveredChart === 'contribution'}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserActivityCharts;
