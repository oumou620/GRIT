
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Type pour les statistiques des risques
interface RiskStat {
  category: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

const RisksSummary: React.FC = () => {
  // Statistiques fictives des risques
  const riskStats: RiskStat[] = [
    {
      category: "Risques critiques",
      count: 3,
      color: "bg-red-500",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      category: "Risques élevés",
      count: 7,
      color: "bg-orange-500",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      category: "Risques moyens",
      count: 12,
      color: "bg-yellow-500",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      category: "Risques faibles",
      count: 15,
      color: "bg-green-500",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {riskStats.map((stat, index) => (
        <Card key={index} className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${stat.color} text-white mr-4`}>
                {stat.icon}
              </div>
              <div className="text-2xl font-bold">{stat.count}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RisksSummary;
