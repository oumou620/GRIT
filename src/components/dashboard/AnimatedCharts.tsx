
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { ChartColumnBig, ChartLine, ChartPie } from "lucide-react";

// Types pour les données des graphiques
interface DataPoint {
  name: string;
  value: number;
  value2?: number;
}

const AnimatedCharts: React.FC = () => {
  const [hoveredChart, setHoveredChart] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Données pour le graphique linéaire
  const lineData: DataPoint[] = [
    { name: "Jan", value: 12, value2: 5 },
    { name: "Fév", value: 19, value2: 8 },
    { name: "Mar", value: 15, value2: 10 },
    { name: "Avr", value: 28, value2: 15 },
    { name: "Mai", value: 25, value2: 18 },
    { name: "Jun", value: 32, value2: 21 },
    { name: "Jul", value: 38, value2: 24 },
    { name: "Aou", value: 30, value2: 20 },
    { name: "Sep", value: 35, value2: 25 },
    { name: "Oct", value: 42, value2: 28 },
    { name: "Nov", value: 48, value2: 30 },
    { name: "Déc", value: 52, value2: 35 },
  ];

  // Données pour le graphique à barres
  const barData: DataPoint[] = [
    { name: "Humain", value: 12 },
    { name: "Technique", value: 24 },
    { name: "Organisationnel", value: 18 },
    { name: "Externe", value: 9 },
  ];

  // Données pour le graphique circulaire
  const pieData: DataPoint[] = [
    { name: "Critique", value: 3 },
    { name: "Élevé", value: 7 },
    { name: "Moyen", value: 12 },
    { name: "Faible", value: 15 },
  ];

  // Couleurs pour le graphique circulaire
  const COLORS = ["#e53e3e", "#ed8936", "#ecc94b", "#48bb78"];

  // Configuration pour les graphiques
  const chartConfig = {
    line: {
      risques: {
        label: "Risques identifiés",
        theme: {
          light: "#3182ce",
          dark: "#4299e1",
        },
      },
      mitigés: {
        label: "Risques mitigés",
        theme: {
          light: "#48bb78",
          dark: "#68d391",
        },
      },
    },
    bar: {
      type: {
        label: "Types de risques",
        theme: {
          light: "#4c51bf",
          dark: "#667eea",
        },
      },
    },
    pie: {
      critique: {
        label: "Critique",
        theme: {
          light: "#e53e3e",
          dark: "#f56565",
        },
      },
      élevé: {
        label: "Élevé",
        theme: {
          light: "#ed8936",
          dark: "#f6ad55",
        },
      },
      moyen: {
        label: "Moyen",
        theme: {
          light: "#ecc94b",
          dark: "#f6e05e",
        },
      },
      faible: {
        label: "Faible",
        theme: {
          light: "#48bb78",
          dark: "#68d391",
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
      <h2 className="text-xl font-bold">Tableau de bord analytique</h2>
      
      <Tabs defaultValue="line" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="line" className="flex items-center gap-2">
            <ChartLine className="h-4 w-4" />
            <span>Tendances</span>
          </TabsTrigger>
          <TabsTrigger value="bar" className="flex items-center gap-2">
            <ChartColumnBig className="h-4 w-4" />
            <span>Types</span>
          </TabsTrigger>
          <TabsTrigger value="pie" className="flex items-center gap-2">
            <ChartPie className="h-4 w-4" />
            <span>Distribution</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="line">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des risques</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-64 md:h-72 lg:h-80 w-full overflow-hidden" 
                onMouseEnter={() => handleMouseEnter('line')} 
                onMouseLeave={handleMouseLeave}
              >
                <ChartContainer config={chartConfig.line}>
                  <ResponsiveContainer width="99%" height="99%" minHeight={200}>
                    <LineChart data={lineData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 11 }}
                        tickMargin={8} 
                        axisLine={{ strokeWidth: 1 }}
                      />
                      <YAxis 
                        domain={[0, 'dataMax + 5']} 
                        tick={{ fontSize: 11 }}
                        tickMargin={8}
                        axisLine={{ strokeWidth: 1 }}
                        width={40}
                      />
                      <Tooltip wrapperStyle={{ zIndex: 1000 }} />
                      <Legend 
                        verticalAlign="top" 
                        height={36} 
                        iconSize={12}
                        formatter={(value) => <span style={{ color: '#333', fontSize: '0.9rem' }}>{value}</span>}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="risques" 
                        stroke="var(--color-risques, #3182ce)" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        isAnimationActive={hoveredChart === 'line'}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value2" 
                        name="mitigés" 
                        stroke="var(--color-mitigés, #48bb78)" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        isAnimationActive={hoveredChart === 'line'}
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
        
        <TabsContent value="bar">
          <Card>
            <CardHeader>
              <CardTitle>Types de risques</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-64 md:h-72 lg:h-80 w-full overflow-hidden" 
                onMouseEnter={() => handleMouseEnter('bar')} 
                onMouseLeave={handleMouseLeave}
              >
                <ChartContainer config={chartConfig.bar}>
                  <ResponsiveContainer width="99%" height="99%" minHeight={200}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 11 }}
                        tickMargin={8} 
                        axisLine={{ strokeWidth: 1 }}
                      />
                      <YAxis 
                        domain={[0, 'dataMax + 5']} 
                        tick={{ fontSize: 11 }}
                        tickMargin={8}
                        axisLine={{ strokeWidth: 1 }}
                        width={40}
                      />
                      <Tooltip wrapperStyle={{ zIndex: 1000 }} />
                      <Legend 
                        verticalAlign="top" 
                        height={36} 
                        iconSize={12}
                        formatter={(value) => <span style={{ color: '#333', fontSize: '0.9rem' }}>{value}</span>}
                      />
                      <Bar 
                        dataKey="value"
                        name="type"
                        fill="var(--color-type, #4c51bf)"
                        radius={[4, 4, 0, 0]}
                        isAnimationActive={hoveredChart === 'bar'}
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
        
        <TabsContent value="pie">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des risques par criticité</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="h-64 md:h-72 lg:h-80 w-full overflow-hidden"
                onMouseEnter={() => handleMouseEnter('pie')} 
                onMouseLeave={handleMouseLeave}
              >
                <ChartContainer config={chartConfig.pie}>
                  <ResponsiveContainer width="99%" height="99%" minHeight={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        paddingAngle={2}
                        isAnimationActive={hoveredChart === 'pie'}
                        animationDuration={1500}
                        animationEasing="ease-in-out"
                        activeIndex={hoveredChart === 'pie' ? activeIndex : undefined}
                      >
                        {pieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                            strokeWidth={index === activeIndex && hoveredChart === 'pie' ? 2 : 0}
                            stroke="#fff"
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 flex justify-center gap-4">
                  {pieData.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div 
                        className="w-3 h-3 mr-2" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm">{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnimatedCharts;
