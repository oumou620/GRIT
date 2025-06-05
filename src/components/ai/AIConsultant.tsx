import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  Sparkles, 
  Loader2, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  Save,
  Trash2,
  BookMarked,
  FileText,
  Clock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { aiService } from "@/services/aiService";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Interface pour les interactions sauvegardées
interface SavedInteraction {
  id: string;
  prompt: string;
  response: string;
  timestamp: number;
  title: string;
}

const AIConsultant: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastPrompt, setLastPrompt] = useState("");
  const [activeTab, setActiveTab] = useState<string>("prompt");
  const [savedInteractions, setSavedInteractions] = useState<SavedInteraction[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [viewingSavedId, setViewingSavedId] = useState<string | null>(null);
  
  // Charger les interactions sauvegardées au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem("ai-consultant-saved");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setSavedInteractions(parsed);
      } catch (error) {
        console.error("Erreur lors du chargement des données sauvegardées:", error);
      }
    }
  }, []);

  // Fonction pour sauvegarder l'interaction actuelle
  const handleSaveInteraction = () => {
    if (!response || !lastPrompt) {
      toast.error("Aucune analyse à sauvegarder");
      return;
    }
    
    setSaveTitle(lastPrompt.length > 40 ? lastPrompt.substring(0, 40) + "..." : lastPrompt);
    setSaveDialogOpen(true);
  };
  
  // Fonction pour confirmer la sauvegarde
  const confirmSave = () => {
    if (!saveTitle.trim()) {
      toast.error("Veuillez entrer un titre pour cette sauvegarde");
      return;
    }
    
    const newInteraction: SavedInteraction = {
      id: Date.now().toString(),
      prompt: lastPrompt,
      response,
      timestamp: Date.now(),
      title: saveTitle
    };
    
    const updatedInteractions = [...savedInteractions, newInteraction];
    setSavedInteractions(updatedInteractions);
    localStorage.setItem("ai-consultant-saved", JSON.stringify(updatedInteractions));
    
    setSaveDialogOpen(false);
    setSaveTitle("");
    setActiveTab("saved");
    toast.success("Analyse sauvegardée avec succès");
  };
  
  // Fonction pour charger une interaction sauvegardée
  const loadSavedInteraction = (id: string) => {
    const saved = savedInteractions.find(item => item.id === id);
    if (saved) {
      setPrompt(saved.prompt);
      setLastPrompt(saved.prompt);
      setResponse(saved.response);
      setViewingSavedId(id);
      setActiveTab("response");
    }
  };
  
  // Fonction pour supprimer une interaction sauvegardée
  const deleteSavedInteraction = (id: string) => {
    const updated = savedInteractions.filter(item => item.id !== id);
    setSavedInteractions(updated);
    localStorage.setItem("ai-consultant-saved", JSON.stringify(updated));
    toast.success("Sauvegarde supprimée");
    
    if (viewingSavedId === id) {
      setViewingSavedId(null);
      setActiveTab("saved");
    }
  };

  const handleAnalyze = async () => {
    if (!prompt.trim()) {
      toast.error("Veuillez entrer un problème à analyser");
      return;
    }

    setIsLoading(true);
    setLastPrompt(prompt); // Sauvegarder le dernier prompt
    
    try {      
      const aiResponse = await aiService.suggestActions(
        `Le problème suivant a été soumis: ${prompt}. \n\n` +
        `Analysez ce problème dans le contexte de la gestion des risques et proposez clairement:\n\n` +
        `1. Les risques potentiels associés à ce problème (3-5 risques majeurs)\n` +
        `2. Des actions concrètes pour atténuer ces risques (1-2 actions par risque)\n` +
        `3. Des bonnes pratiques à mettre en place pour prévenir ces risques\n\n` +
        `Format souhaité: Structurez votre réponse avec des sections claires pour "Risques identifiés", "Actions recommandées", et "Bonnes pratiques". Utilisez des puces ou des listes numérotées.`
      );
      
      // Traitement réussi, définir la réponse et passer à l'onglet de réponse
      setResponse(aiResponse);
      setActiveTab("response");
      toast.success("Analyse terminée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'analyse du problème:", error);
      setResponse("Une erreur s'est produite lors de l'analyse de votre demande. Veuillez réessayer dans quelques instants.");
      toast.error("Échec de l'analyse. Veuillez réessayer.");
      setActiveTab("response"); // Afficher quand même l'onglet de réponse pour voir le message d'erreur
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/30 rounded-t-lg border-b pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-500 p-2 rounded-lg shadow-md">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400">
              Consultant IA en gestion des risques
            </CardTitle>
            <CardDescription className="mt-1">
              Obtenez des conseils avancés et identifiez les risques potentiels de vos projets
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-4 border-b">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="prompt" className="flex items-center gap-2">
              <Info className="h-4 w-4" /> 
              <span>Demande</span>
            </TabsTrigger>
            <TabsTrigger value="response" className="flex items-center gap-2" disabled={!response && !isLoading}>
              <ShieldAlert className="h-4 w-4" /> 
              <span>Analyse</span>
              {response && <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">1</Badge>}
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <BookMarked className="h-4 w-4" /> 
              <span>Sauvegardés</span>
              {savedInteractions.length > 0 && (
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                  {savedInteractions.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6 pb-2">
          {/* Dialogue de sauvegarde */}
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Sauvegarder cette analyse</DialogTitle>
                <DialogDescription>
                  Donnez un titre à cette analyse pour la retrouver facilement plus tard.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="save-title" className="text-sm font-medium">Titre</label>
                  <Input
                    id="save-title"
                    value={saveTitle}
                    onChange={(e) => setSaveTitle(e.target.value)}
                    placeholder="Titre de cette analyse"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Aperçu</p>
                  <div className="text-sm max-h-32 overflow-y-auto p-3 rounded-md bg-slate-50 dark:bg-slate-900">
                    {lastPrompt.substring(0, 200)}{lastPrompt.length > 200 ? "..." : ""}
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>Annuler</Button>
                <Button onClick={confirmSave} className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white">
                  Sauvegarder
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <TabsContent value="prompt" className="m-0">
            <div className="space-y-6">
              {lastPrompt && response && (
                <Alert className="bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertDescription className="text-green-800 dark:text-green-300">
                    Votre dernière analyse est disponible dans l'onglet "Analyse des risques"
                  </AlertDescription>
                </Alert>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">Décrivez votre situation ou problématique :</label>
                <Textarea
                  placeholder="Ex: Notre entreprise prévoit d'externaliser le stockage de données clients vers un fournisseur cloud. Quels sont les principaux risques et comment les prévenir?"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[180px] resize-none text-base focus-visible:ring-indigo-500"
                />
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-900">
                <h3 className="font-medium flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <Info className="h-4 w-4" />
                  Conseils pour obtenir de meilleures réponses
                </h3>
                <ul className="text-sm mt-2 space-y-1 text-amber-700 dark:text-amber-400">
                  <li>• Soyez spécifique sur le contexte de votre organisation</li>
                  <li>• Mentionnez les enjeux principaux et contraintes</li>
                  <li>• Précisez le secteur d'activité et la réglementation applicable</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="m-0 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-blue-500" />
                Analyses sauvegardées
              </h3>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {savedInteractions.length} sauvegarde{savedInteractions.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            {savedInteractions.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-4 mb-4">
                  <BookMarked className="h-10 w-10 text-blue-500/50" />
                </div>
                <h3 className="text-lg font-medium mb-2">Aucune analyse sauvegardée</h3>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                  Lorsque vous obtenez une analyse pertinente, vous pouvez la sauvegarder 
                  pour y accéder ultérieurement depuis cet onglet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedInteractions.map((interaction) => (
                  <div key={interaction.id} className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800/50 hover:shadow-md transition-shadow">
                    <div className="p-4 border-b">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2 flex-grow">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <h4 className="font-medium text-md line-clamp-1">
                            {interaction.title}
                          </h4>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => deleteSavedInteraction(interaction.id)} 
                            className="h-8 w-8 p-0" 
                            title="Supprimer"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {format(new Date(interaction.timestamp), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => loadSavedInteraction(interaction.id)} 
                          className="h-7 text-xs"
                        >
                          Consulter
                        </Button>
                      </div>
                    </div>
                    
                    <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/20 text-sm">
                      <p className="line-clamp-2 text-muted-foreground text-xs italic">
                        « {interaction.prompt.substring(0, 180)}{interaction.prompt.length > 180 ? "..." : ""} »
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="response" className="m-0 space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="rounded-full bg-indigo-500/20 p-4 mb-4">
                    <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-1 text-indigo-700 dark:text-indigo-300">Analyse en cours</h3>
                  <p className="text-sm text-muted-foreground text-center">
                    L'IA analyse votre situation et identifie les risques potentiels...
                  </p>
                </div>
              </div>
            ) : response ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    Analyse et recommandations
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                      onClick={handleSaveInteraction}
                    >
                      <Save className="h-3.5 w-3.5" />
                      Sauvegarder
                    </Button>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      IA Assistant
                    </Badge>
                  </div>
                </div>
                
                <div className="p-5 bg-white dark:bg-gray-800/50 rounded-lg shadow-sm border">
                  <div className="mb-3 pb-3 border-b">
                    <p className="text-sm text-muted-foreground font-medium">En réponse à :</p>
                    <p className="text-sm mt-1 italic">« {lastPrompt} »</p>
                  </div>
                  
                  <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-h3:text-base prose-headings:mb-2 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100">
                    <div className="whitespace-pre-line">
                      {response}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab("prompt")} 
                    className="flex items-center gap-1"
                  >
                    <ArrowRight className="h-3 w-3 rotate-180" />
                    Retour à la demande
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setPrompt("");
                      setActiveTab("prompt");
                    }} 
                    className="flex items-center gap-1"
                  >
                    Nouvelle demande
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
                <p>Aucune analyse disponible. Veuillez soumettre une demande.</p>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-end border-t pt-4 pb-4 bg-slate-50/50 dark:bg-slate-900/20">
        {activeTab === "prompt" && (
          <Button 
            onClick={handleAnalyze} 
            disabled={isLoading || !prompt.trim()}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              <>
                <ShieldAlert className="h-4 w-4" />
                Analyser les risques
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AIConsultant;
