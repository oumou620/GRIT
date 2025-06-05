
import React from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Paramètres</h1>
          <p className="text-muted-foreground">
            Configurez votre application de gestion des risques
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'organisation</CardTitle>
                <CardDescription>
                  Modifiez les informations concernant votre organisation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l'organisation</Label>
                  <Input id="company-name" defaultValue="Acme Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-description">Description</Label>
                  <Textarea
                    id="company-description"
                    defaultValue="Entreprise spécialisée dans les services informatiques et la cybersécurité."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-industry">Secteur d'activité</Label>
                  <Input id="company-industry" defaultValue="Technologies de l'information" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size">Taille de l'entreprise</Label>
                  <Input id="company-size" defaultValue="250 employés" />
                </div>
                <Button>Enregistrer les modifications</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Paramètres d'affichage</CardTitle>
                <CardDescription>
                  Personnalisez l'interface utilisateur
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme-toggle">Thème sombre</Label>
                  <Switch id="theme-toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="compact-mode">Mode compact</Label>
                  <Switch id="compact-mode" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations">Animations</Label>
                  <Switch id="animations" defaultChecked />
                </div>
                <Button>Appliquer</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications par email</CardTitle>
                <CardDescription>
                  Configurez les emails que vous souhaitez recevoir
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-risk">Nouveau risque identifié</Label>
                  <Switch id="new-risk" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="risk-update">Mise à jour d'un risque</Label>
                  <Switch id="risk-update" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-action">Nouvelle action planifiée</Label>
                  <Switch id="new-action" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="action-deadline">Échéance d'action proche</Label>
                  <Switch id="action-deadline" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="new-report">Nouveau rapport généré</Label>
                  <Switch id="new-report" defaultChecked />
                </div>
                <Button>Enregistrer les préférences</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications dans l'application</CardTitle>
                <CardDescription>
                  Configurez les alertes à afficher dans le tableau de bord
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-risk-critical">Risques critiques</Label>
                  <Switch id="app-risk-critical" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-risk-high">Risques élevés</Label>
                  <Switch id="app-risk-high" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-action-late">Actions en retard</Label>
                  <Switch id="app-action-late" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-system-update">Mises à jour système</Label>
                  <Switch id="app-system-update" />
                </div>
                <Button>Enregistrer les préférences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentification</CardTitle>
                <CardDescription>
                  Renforcez la sécurité de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Authentification à deux facteurs</p>
                    <p className="text-sm text-muted-foreground">Ajoutez une couche supplémentaire de sécurité</p>
                  </div>
                  <Button variant="outline">Configurer</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Modifier le mot de passe</p>
                    <p className="text-sm text-muted-foreground">Changez votre mot de passe actuel</p>
                  </div>
                  <Button variant="outline">Modifier</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sessions actives</p>
                    <p className="text-sm text-muted-foreground">Gérez vos sessions de connexion</p>
                  </div>
                  <Button variant="outline">Afficher</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Journaux d'audit</CardTitle>
                <CardDescription>
                  Consultez l'historique des actions réalisées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <p className="text-sm text-muted-foreground">
                    Les journaux d'audit conservent une trace de toutes les actions réalisées par les utilisateurs.
                  </p>
                  <Button className="mt-4 md:mt-0">
                    Consulter les journaux
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Intégrations tierces</CardTitle>
                <CardDescription>
                  Connectez vos outils existants à la plateforme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-md p-2 w-10 h-10 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Jira</p>
                      <p className="text-sm text-muted-foreground">Synchroniser les actions avec les tickets Jira</p>
                    </div>
                  </div>
                  <Button variant="outline">Configurer</Button>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-md p-2 w-10 h-10 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Microsoft Teams</p>
                      <p className="text-sm text-muted-foreground">Envoyer des notifications dans Teams</p>
                    </div>
                  </div>
                  <Button variant="outline">Configurer</Button>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 rounded-md p-2 w-10 h-10 flex items-center justify-center">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Slack</p>
                      <p className="text-sm text-muted-foreground">Intégrer les alertes dans Slack</p>
                    </div>
                  </div>
                  <Button variant="outline">Configurer</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API</CardTitle>
                <CardDescription>
                  Gérez les accès API pour l'intégration avec vos applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Clé API</Label>
                  <div className="flex gap-2">
                    <Input id="api-key" defaultValue="••••••••••••••••••••••••••••••" readOnly />
                    <Button variant="outline">Copier</Button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Dernière utilisation: 10 juin 2023, 15:45
                    </p>
                  </div>
                  <Button>Régénérer la clé</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
