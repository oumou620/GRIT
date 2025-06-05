
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RiskMatrix from "@/components/dashboard/RiskMatrix";

const MatrixPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Matrice des risques</h1>
          <p className="text-muted-foreground">
            Visualisez la distribution des risques selon leur impact et probabilité
          </p>
        </div>
        
        <RiskMatrix />
      </div>
    </DashboardLayout>
  );
};

export default MatrixPage;
