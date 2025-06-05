
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ReportCharts from "@/components/dashboard/ReportCharts";

const ReportsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Rapports</h1>
          <p className="text-muted-foreground">
            Consultez les rapports et analyses de risques
          </p>
        </div>
        
        <ReportCharts />
        
        {/* Section pour les rapports générés */}
        <div className="grid grid-cols-1 gap-6">
          <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-medium mb-4">Rapports disponibles</h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Rapport trimestriel T2 2023</p>
                  <p className="text-sm text-muted-foreground">Généré le 30 juin 2023</p>
                </div>
                <button className="text-primary hover:underline">Télécharger</button>
              </li>
              <li className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Rapport trimestriel T1 2023</p>
                  <p className="text-sm text-muted-foreground">Généré le 31 mars 2023</p>
                </div>
                <button className="text-primary hover:underline">Télécharger</button>
              </li>
              <li className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Rapport annuel 2022</p>
                  <p className="text-sm text-muted-foreground">Généré le 15 janvier 2023</p>
                </div>
                <button className="text-primary hover:underline">Télécharger</button>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Rapport trimestriel T4 2022</p>
                  <p className="text-sm text-muted-foreground">Généré le 31 décembre 2022</p>
                </div>
                <button className="text-primary hover:underline">Télécharger</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
