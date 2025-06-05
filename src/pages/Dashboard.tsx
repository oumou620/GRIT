
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RisksSummary from "@/components/dashboard/RisksSummary";
import RecentRisks from "@/components/dashboard/RecentRisks";
import RiskMatrix from "@/components/dashboard/RiskMatrix";
import ActionsToDo from "@/components/dashboard/ActionsToDo";
import AnimatedCharts from "@/components/dashboard/AnimatedCharts";

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble des risques informatiques de votre organisation
          </p>
        </div>

        <RisksSummary />
        
        <AnimatedCharts />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentRisks />
          <ActionsToDo />
        </div>

        <RiskMatrix />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
