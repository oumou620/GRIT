import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { aiService } from "@/services/aiService";

interface AIAssistantProps {
  mode: "analyze" | "suggest";
  inputText: string;
  onSuggestionSelect?: (suggestion: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ mode, inputText, onSuggestionSelect }) => {
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = async () => {
    if (!inputText.trim()) {
      setError("Veuillez fournir un texte à analyser");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;
      if (mode === "analyze") {
        response = await aiService.analyzeText(inputText);
      } else {
        response = await aiService.suggestActions(inputText);
      }
      setResult(response);
    } catch (err) {
      setError("Une erreur s'est produite lors de l'analyse");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseThisSuggestion = () => {
    if (onSuggestionSelect && result) {
      onSuggestionSelect(result);
    }
  };

  return (
    <Card className="mt-2 mb-1">
      <CardHeader className="px-4 py-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          {mode === "analyze" ? "Analyse IA" : "Suggestions d'actions"}
        </CardTitle>
        <CardDescription className="text-xs">
          {mode === "analyze" 
            ? "Utilisez l'IA pour analyser ce texte et identifier les risques potentiels" 
            : "Générez des suggestions d'actions pour atténuer ce risque"}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <Button 
              onClick={handleGenerateClick} 
              disabled={isLoading || !inputText.trim()}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  {mode === "analyze" ? "Analyser avec l'IA" : "Générer des suggestions"}
                </>
              )}
            </Button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {result && (
            <div className="mt-4">
              <Textarea 
                value={result} 
                readOnly 
                className="min-h-[100px] max-h-[180px] bg-gray-50 text-sm"
              />
              
              {mode === "suggest" && onSuggestionSelect && (
                <Button 
                  onClick={handleUseThisSuggestion} 
                  className="mt-2"
                  variant="outline"
                >
                  Utiliser cette suggestion
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAssistant;
