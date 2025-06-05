import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartBarBig, ChartPie } from "lucide-react";

// Types pour les données des graphiques
interface DataPoint {
  name: string;
  value: number;
}

const ReportCharts: React.FC = () => {
  const [hoveredChart, setHoveredChart] = useState<string | null>(null);
  
  // Données pour le graphique d'efficacité
  const effectivenessData: DataPoint[] = [
    { name: "Planifiées", value: 42 },
    { name: "En cours", value: 28 },
    { name: "Terminées", value: 35 },
    { name: "Efficaces", value: 30 },
  ];

  // Données pour le graphique de couverture
  const coverageData: DataPoint[] = [
    { name: "Humain", value: 85 },
    { name: "Technique", value: 65 },
    { name: "Organisationnel", value: 75 },
    { name: "Externe", value: 50 },
  ];

  // Couleurs pour les graphiques
  const COLORS = ["#4c51bf", "#3182ce", "#48bb78", "#ed8936"];

  // Configuration pour les graphiques
  const chartConfig = {
    effectiveness: {
      actions: {
        label: "Actions",
        theme: {
          light: "#805ad5",
          dark: "#9f7aea",
        },
      },
    },
    coverage: {
      couverture: {
        label: "Taux de couverture",
        theme: {
          light: "#ed8936",
          dark: "#f6ad55",
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
      <h2 className="text-xl font-bold">Graphiques des rapports</h2>
      
      <Tabs defaultValue="effectiveness" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="effectiveness" className="flex items-center gap-2">
            <ChartBarBig className="h-4 w-4" />
            <span>Efficacité</span>
          </TabsTrigger>
          <TabsTrigger value="coverage" className="flex items-center gap-2">
            <ChartPie className="h-4 w-4" />
            <span>Couverture</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="effectiveness">
          <Card>
            <CardHeader>
              <CardTitle>Efficacité des actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-60 md:h-72 w-full overflow-hidden" 
                onMouseEnter={() => handleMouseEnter('effectiveness')} 
                onMouseLeave={handleMouseLeave}
              >
                <ChartContainer config={chartConfig.effectiveness}>
                  <ResponsiveContainer width="99%" height="100%">
                    <BarChart 
                      data={effectivenessData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
                        tick={{ fill: '#888', fontSize: 12 }}
                        height={50}
                        tickLine={false}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                        width={40}
                      />
                      <Tooltip 
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          borderRadius: '6px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                          border: 'none'
                        }} 
                      />
                      <Legend verticalAlign="top" height={36} iconSize={12} iconType="circle" />
                      <Bar 
                        dataKey="value" 
                        name="Actions" 
                        fill="var(--color-actions, #805ad5)" 
                        radius={[4, 4, 0, 0]}
                        isAnimationActive={hoveredChart === 'effectiveness'}
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="coverage">
          <Card>
            <CardHeader>
              <CardTitle>Taux de couverture par catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-60 md:h-72 w-full overflow-hidden" 
                onMouseEnter={() => handleMouseEnter('coverage')} 
                onMouseLeave={handleMouseLeave}
              >
                <ChartContainer config={chartConfig.coverage}>
                  <ResponsiveContainer width="99%" height="100%">
                    <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <Pie
                        data={coverageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        isAnimationActive={hoveredChart === 'coverage'}
                        animationDuration={1500}
                      >
                        {coverageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Couverture']}
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          borderRadius: '6px',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                          border: 'none'
                        }} 
                      />
                      <Legend verticalAlign="top" height={36} iconSize={12} iconType="circle" />
                    </PieChart>
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

export default ReportCharts;
