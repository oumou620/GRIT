import React, { useState, useEffect, useRef } from "react";
import "./AIConsultant.css";

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

interface SpeechGrammarList {
  readonly length: number;
  item(index: number): SpeechGrammar;
  [index: number]: SpeechGrammar;
  addFromURI(src: string, weight?: number): void;
  addFromString(string: string, weight?: number): void;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string; 
  readonly message?: string;
}

interface SpeechRecognitionEventMap {
  "audiostart": Event;
  "audioend": Event;
  "end": Event;
  "error": SpeechRecognitionErrorEvent;
  "nomatch": SpeechRecognitionEvent;
  "result": SpeechRecognitionEvent;
  "soundstart": Event;
  "soundend": Event;
  "speechstart": Event;
  "speechend": Event;
  "start": Event;
}

interface SpeechRecognition extends EventTarget {
  grammars: SpeechGrammarList;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI?: string;

  start(): void;
  stop(): void;
  abort(): void;

  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;

  addEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
  removeEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (this: SpeechRecognition, ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic | undefined;
    webkitSpeechRecognition: SpeechRecognitionStatic | undefined;
  }
  var SpeechRecognition: SpeechRecognitionStatic | undefined;
  var webkitSpeechRecognition: SpeechRecognitionStatic | undefined;
}

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
  Info,
  Save,
  Trash2,
  BookMarked,
  FileText,
  Clock,
  Mic,
  Volume2,
  StopCircle,
  CheckCircle2,
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
  const [lastPrompt, setLastPrompt] = useState(""); // Pour le dialogue de sauvegarde
  const [activeTab, setActiveTab] = useState<string>("prompt");
  const [savedInteractions, setSavedInteractions] = useState<SavedInteraction[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveTitle, setSaveTitle] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [viewingSavedId, setViewingSavedId] = useState<string | null>(null);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(-1);
  const paragraphRefs = useRef<(HTMLElement | null)[]>([]);
  
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

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  // Effet pour faire défiler vers le paragraphe en cours de lecture
  useEffect(() => {
    if (currentParagraphIndex >= 0 && currentParagraphIndex < paragraphRefs.current.length) {
      const currentParagraphElement = paragraphRefs.current[currentParagraphIndex];
      if (currentParagraphElement) {
        // Défiler vers le paragraphe avec une animation fluide
        currentParagraphElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'nearest'
        });
        
        // Ajouter une classe de surbrillance au paragraphe actuel (optionnel)
        currentParagraphElement.classList.add('highlight-paragraph');
        
        // Nettoyer la surbrillance précédente
        return () => {
          if (currentParagraphElement) {
            currentParagraphElement.classList.remove('highlight-paragraph');
          }
        };
      }
    }
  }, [currentParagraphIndex]);

  const handleAnalyze = async () => {
    if (!prompt.trim()) {
      toast.error("Veuillez entrer un problème à analyser");
      return;
    }
    setIsLoading(true);
    setLastPrompt(prompt); // Sauvegarder le prompt actuel pour le dialogue de sauvegarde et l'affichage
    try {
      const aiResponse = await aiService.suggestActions(
        `Le problème suivant a été soumis: ${prompt}. \n\n` +
        `Analysez ce problème dans le contexte de la gestion des risques et proposez clairement:\n\n` +
        `1. Les risques potentiels associés à ce problème (3-5 risques majeurs)\n` +
        `2. Des actions concrètes pour atténuer ces risques (1-2 actions par risque)\n` +
        `3. Des bonnes pratiques à mettre en place pour prévenir ces risques\n\n` +
        `Format souhaité: Structurez votre réponse avec des sections claires pour "Risques identifiés", "Actions recommandées", et "Bonnes pratiques". Utilisez des puces ou des listes numérotées.`
      );
      setResponse(aiResponse);
      setActiveTab("response");
      toast.success("Analyse terminée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'analyse du problème:", error);
      setResponse("Une erreur s'est produite lors de l'analyse de votre demande. Veuillez réessayer dans quelques instants.");
      toast.error("Échec de l'analyse. Veuillez réessayer.");
      setActiveTab("response");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveInteraction = () => {
    if (!lastPrompt || !response) {
      toast.error("Aucune analyse à sauvegarder.");
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

  const handleToggleListening = () => {
    // Use a different name for the local variable to avoid conflict with the interface name
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      toast.error("La reconnaissance vocale n'est pas supportée par votre navigateur.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    recognitionRef.current = new SpeechRecognitionAPI();
    recognitionRef.current.lang = 'fr-FR';
    recognitionRef.current.continuous = false; // S'arrête après une pause
    recognitionRef.current.interimResults = true; // Résultats intermédiaires pour feedback

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      toast.info("L'IA vous écoute...");
    };

    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      let newFinalTranscriptSegment = '';
      let newInterimTranscriptSegment = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          newFinalTranscriptSegment += transcript;
        } else {
          newInterimTranscriptSegment += transcript;
        }
      }

      // Mettre à jour le prompt affiché dans la zone de texte.
      // lastPrompt contient le texte de base AVANT le début de cette session d'écoute.
      setPrompt(lastPrompt + newFinalTranscriptSegment + newInterimTranscriptSegment);

      if (newFinalTranscriptSegment) {
        // Si un nouveau segment final est arrivé, mettre à jour lastPrompt pour l'inclure.
        // Ainsi, la prochaine mise à jour de l'intérim s'appuiera sur ce nouveau texte de base.
        setLastPrompt(prevBase => prevBase + newFinalTranscriptSegment);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Erreur de reconnaissance vocale:", event.error);
      let errorMessage = "Une erreur s'est produite lors de la reconnaissance vocale.";
      if (event.error === 'no-speech') {
        errorMessage = "Aucune parole détectée. Veuillez réessayer.";
      } else if (event.error === 'audio-capture') {
        errorMessage = "Problème de capture audio. Vérifiez votre microphone.";
      } else if (event.error === 'not-allowed') {
        errorMessage = "Accès au microphone refusé. Veuillez autoriser l'accès dans les paramètres de votre navigateur.";
      }
      toast.error(errorMessage);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
      // Si vous voulez que le prompt final soit uniquement ce qui a été dit après le clic:
      // setPrompt(currentTranscript); // Assurez-vous que currentTranscript est bien géré
    };

    try {
      // `prompt` contient le texte actuel de la textarea.
      // `lastPrompt` deviendra cette valeur de base pour la session d'écoute qui commence.
      setLastPrompt(prompt);
      recognitionRef.current.start();
    } catch (error) {
      console.error("Erreur au démarrage de la reconnaissance vocale:", error);
      toast.error("Impossible de démarrer la reconnaissance vocale.");
      setIsListening(false);
    }
  };

  const handleSpeakResponse = (textToSpeak: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error("La synthèse vocale n'est pas supportée par votre navigateur.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentParagraphIndex(-1);
      return;
    }

    // Si une précédente énonciation est en pause, la reprendre
    if (window.speechSynthesis.paused && utteranceRef.current) {
        window.speechSynthesis.resume();
        setIsSpeaking(true);
        return;
    }
    
    // Réinitialiser l'index du paragraphe courant
    setCurrentParagraphIndex(-1);
    
    // Préparer les paragraphes pour le défilement
    const paragraphs = textToSpeak.split('\n');
    paragraphRefs.current = new Array(paragraphs.length).fill(null);

    // Nettoyer le texte en supprimant les caractères spéciaux de formatage Markdown
    const cleanText = textToSpeak
      .replace(/\*/g, '') // Supprime tous les astérisques
      .replace(/\#/g, '') // Supprime les signes dièse
      .replace(/\-{3,}/g, ' ') // Remplace les séparateurs par des espaces
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remplace les liens [texte](url) par texte
      .replace(/\`/g, '') // Supprime les backticks
      .replace(/\>{2,}/g, ''); // Supprime les chevrons
      
    utteranceRef.current = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current.lang = 'fr-FR'; // Définir la langue
    // Vous pouvez choisir une voix spécifique si disponible
    // const voices = window.speechSynthesis.getVoices();
    // utteranceRef.current.voice = voices.find(voice => voice.lang === 'fr-FR') || voices[0];
    
    utteranceRef.current.onstart = () => {
      setIsSpeaking(true);
      setCurrentParagraphIndex(0); // Commencer au premier paragraphe
    };

    utteranceRef.current.onend = () => {
      setIsSpeaking(false);
      setCurrentParagraphIndex(-1); // Réinitialiser l'index
    };

    // Ajouter un gestionnaire pour suivre la progression de la parole
    utteranceRef.current.onboundary = (event) => {
      if (event.name === 'sentence') {
        // Estimer le paragraphe actuel en fonction du caractère actuel
        const paragraphs = textToSpeak.split('\n');
        let charCount = 0;
        let currentIndex = 0;
        
        for (let i = 0; i < paragraphs.length; i++) {
          charCount += paragraphs[i].length + 1; // +1 pour le saut de ligne
          if (event.charIndex < charCount) {
            currentIndex = i;
            break;
          }
        }
        
        if (currentIndex !== currentParagraphIndex) {
          setCurrentParagraphIndex(currentIndex);
        }
      }
    };

    utteranceRef.current.onerror = (event) => {
      console.error("Erreur de synthèse vocale:", event.error);
      toast.error("Erreur lors de la lecture de la réponse.");
      setIsSpeaking(false);
      setCurrentParagraphIndex(-1); // Réinitialiser en cas d'erreur
    };
    
    window.speechSynthesis.speak(utteranceRef.current);
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
                  <div className="prose prose-sm sm:prose dark:prose-invert max-w-none p-4 bg-slate-50 dark:bg-slate-800/30 rounded-md border dark:border-slate-700 shadow-inner min-h-[200px] overflow-y-auto">
                    {/* Contenu de l'aperçu de la réponse pour la sauvegarde */}
                    {lastPrompt.substring(0, 200)}{lastPrompt.length > 200 ? "..." : ""} <br/>...<br/>
                    {response.substring(0, 300)}{response.length > 300 ? "..." : ""}
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
                <div className="flex items-center justify-start mt-3 mb-2">
                  <Button 
                    variant={isListening ? "destructive" : "outline"} 
                    size="sm" 
                    onClick={handleToggleListening}
                    className="flex items-center gap-2"
                    title={isListening ? "Arrêter l'écoute" : "Commencer l'écoute (dicter)"}
                  >
                    <Mic className={`h-4 w-4 ${isListening ? "animate-pulse text-red-500" : ""}`} />
                    {isListening ? "En écoute..." : "Dicter"}
                  </Button>
                </div>
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
              <div className="flex flex-col items-center justify-center min-h-[200px] text-center p-6">
                <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
                <p className="text-lg font-semibold">Analyse en cours...</p>
                <p className="text-sm text-muted-foreground">Veuillez patienter pendant que nous traitons votre demande.</p>
              </div>
            ) : response ? (
              <div className="space-y-4">
                <div className="p-4 border-b dark:border-slate-700">
                  <p className="text-sm text-muted-foreground mb-1">Votre demande initiale :</p>
                  <p className="font-medium italic text-indigo-700 dark:text-indigo-400">{lastPrompt}</p>
                </div>
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none p-5 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-800/40 dark:to-gray-800/30 rounded-lg border dark:border-slate-700 shadow-md">
                  {response.split('\n').map((paragraph, index) => {
                    // Fonction pour assigner la référence au paragraphe
                    const assignRef = (el: HTMLElement | null) => {
                      if (paragraphRefs.current.length > index) {
                        paragraphRefs.current[index] = el;
                      }
                    };
                    
                    // Ajouter une classe spéciale pour le paragraphe en cours de lecture
                    const isCurrentParagraph = index === currentParagraphIndex;
                    const highlightClass = isCurrentParagraph ? 'bg-blue-50 dark:bg-blue-900/20 transition-colors duration-300' : '';
                    
                    if (paragraph.startsWith("### ")) {
                      return <h3 
                        key={index} 
                        ref={assignRef} 
                        className={`font-semibold text-lg mt-4 mb-2 ${highlightClass}`}
                      >
                        {paragraph.replace("### ", "")}
                      </h3>;
                    } else if (paragraph.startsWith("## ")) {
                      return <h2 
                        key={index} 
                        ref={assignRef} 
                        className={`font-bold text-xl mt-5 mb-3 ${highlightClass}`}
                      >
                        {paragraph.replace("## ", "")}
                      </h2>;
                    } else if (paragraph.startsWith("# ")) {
                      return <h1 
                        key={index} 
                        ref={assignRef} 
                        className={`font-extrabold text-2xl mt-6 mb-4 ${highlightClass}`}
                      >
                        {paragraph.replace("# ", "")}
                      </h1>;
                    }
                    
                    const listItemMatch = paragraph.match(/^\s*[-*+]\s+(.*)/);
                    if (listItemMatch) {
                      return <ul key={index} ref={assignRef} className={`list-disc list-inside ml-4 ${highlightClass}`}>
                        <li className="mb-1">{listItemMatch[1]}</li>
                      </ul>;
                    }
                    
                    const orderedListItemMatch = paragraph.match(/^\s*\d+\.\s+(.*)/);
                    if (orderedListItemMatch) {
                      return <ol key={index} ref={assignRef} className={`list-decimal list-inside ml-4 ${highlightClass}`}>
                        <li className="mb-1">{orderedListItemMatch[1]}</li>
                      </ol>;
                    }
                    
                    return <p 
                      key={index} 
                      ref={assignRef} 
                      className={`mb-2 leading-relaxed ${highlightClass}`}
                    >
                      {paragraph}
                    </p>;
                  })}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSpeakResponse(response)}
                    className="flex items-center gap-2"
                    title={isSpeaking ? "Arrêter la lecture" : "Écouter la réponse"}
                  >
                    {isSpeaking ? <StopCircle className="h-4 w-4 text-red-500 animate-pulse" /> : <Volume2 className="h-4 w-4 text-blue-500" />}
                    {isSpeaking ? "Arrêter" : "Écouter"} 
                  </Button>
                  <Button onClick={handleSaveInteraction} size="sm" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Save className="h-4 w-4" />
                    Sauvegarder l'analyse
                  </Button>
                  <Button 
                    onClick={() => {
                      setPrompt("");
                      setResponse("");
                      setLastPrompt("");
                      setActiveTab("prompt");
                    }} 
                    size="sm" 
                    variant="outline"
                    className="flex items-center gap-1 ml-2"
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
