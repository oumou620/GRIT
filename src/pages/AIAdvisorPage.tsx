import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AIConsultant from "@/components/ai/AIConsultant";
import { Lightbulb, Shield, Info, Brain } from "lucide-react";

const AIAdvisorPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/10 p-6 rounded-xl border border-indigo-100 dark:border-indigo-900/40 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-3 rounded-lg shadow-md">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
                Consultant IA en gestion des risques
              </h1>
              <p className="text-muted-foreground">
                Obtenez des analyses personnalisées, identifiez les risques critiques et développez des stratégies d'atténuation efficaces
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AIConsultant />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-800/90 shadow-sm p-6 rounded-xl border">
              <div className="flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-indigo-500" />
                <h2 className="text-lg font-semibold">Utilisation du consultant</h2>
              </div>
              
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">1</span>
                  <span>Décrivez clairement votre problème ou votre situation</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">2</span>
                  <span>Soyez spécifique et incluez les détails pertinents</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">3</span>
                  <span>Posez des questions précises pour des conseils ciblés</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">4</span>
                  <span>L'IA analysera votre problème et proposera des recommandations</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 h-5 w-5 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">5</span>
                  <span>Affinez vos questions en fonction des réponses reçues</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800/40 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold">Exemples de requêtes efficaces</h3>
              </div>
              <ul className="space-y-4">
                <li className="text-sm p-3 rounded-lg bg-white/80 dark:bg-slate-800/80 shadow-sm border border-blue-50 dark:border-blue-900/40">
                  "Nous planifions de déplacer nos serveurs vers un nouveau data center. Quels sont les risques potentiels et comment les anticiper?"
                </li>
                <li className="text-sm p-3 rounded-lg bg-white/80 dark:bg-slate-800/80 shadow-sm border border-blue-50 dark:border-blue-900/40">
                  "Notre entreprise va lancer un nouveau produit financier qui traite des données sensibles. Comment gérer les risques réglementaires et de sécurité?"
                </li>
                <li className="text-sm p-3 rounded-lg bg-white/80 dark:bg-slate-800/80 shadow-sm border border-blue-50 dark:border-blue-900/40">
                  "Nous avons identifié des vulnérabilités dans notre système de sécurité. Quelles actions prioritaires devrions-nous entreprendre pour les atténuer?"
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAdvisorPage;
