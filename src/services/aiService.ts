// Service pour l'intégration de l'IA
import { toast } from "sonner";

// Configuration de l'API
const API_KEY = "AIzaSyB1z3oyB4kRmIUa_hCrKrhoSIpcVZSqkYw";

// URL de base pour l'API Gemini (utilisant la version 2.0 Flash)
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

/**
 * Service qui gère les interactions avec l'IA
 */
class AIService {
  /**
   * Analyse un texte pour extraire des insights
   * @param text Le texte à analyser
   * @returns Les insights extraits par l'IA
   */
  async analyzeText(text: string): Promise<string> {
    try {
      if (!API_KEY) {
        console.error("Clé API manquante");
        toast.error("Configuration de l'IA incomplète");
        return "Configuration de l'IA incomplète";
      }

      console.log("Début de l'analyse avec l'IA");
      console.log("Utilisation de l'URL API:", API_URL);
      
      // Requête formatée selon l'exemple cURL
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `Analyse ce texte et identifie les risques potentiels ou éléments importants à considérer dans un contexte de gestion des risques d'entreprise. Sois précis et concis: ${text}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 800,
          topP: 0.8,
          topK: 40
        }
      };

      // Appel à l'API Google AI
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur API (${response.status}):`, errorText);
        throw new Error(`Erreur API: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Réponse de l'API:", data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
        console.error("Format de réponse inattendu:", data);
        throw new Error("Format de réponse inattendu");
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Erreur lors de l'analyse du texte:", error);
      toast.error("Erreur lors de l'analyse avec l'IA. Vérifiez la console pour plus de détails.");
      return "Erreur lors de l'analyse du texte. Veuillez réessayer ultérieurement.";
    }
  }

  /**
   * Génère des suggestions pour un plan d'action basé sur un risque
   * @param riskDescription Description du risque
   * @returns Suggestions d'actions générées par l'IA
   */
  async suggestActions(riskDescription: string): Promise<string> {
    try {
      if (!API_KEY) {
        console.error("Clé API manquante");
        toast.error("Configuration de l'IA incomplète");
        return "Configuration de l'IA incomplète";
      }

      console.log("Début de la génération de suggestions avec l'IA");
      console.log("Texte à analyser:", riskDescription.substring(0, 100) + (riskDescription.length > 100 ? '...' : ''));

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `En tant qu'expert en gestion des risques d'entreprise, propose 3 actions concrètes, réalistes et détaillées pour atténuer ce risque: ${riskDescription}. Format souhaitable: 1. Première action - description détaillée. 2. Deuxième action - description détaillée. 3. Troisième action - description détaillée.`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 800,
          topP: 0.8,
          topK: 40
        }
      };

      console.log("Corps de la requête:", JSON.stringify(requestBody).substring(0, 200) + "...");

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur API (${response.status}):`, errorText);
        throw new Error(`Erreur API: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Réponse de l'API (suggestions):", data);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0].text) {
        console.error("Format de réponse inattendu:", data);
        throw new Error("Format de réponse inattendu");
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Erreur lors de la génération de suggestions:", error);
      toast.error("Erreur lors de la génération de suggestions. Vérifiez la console pour plus de détails.");
      return "Erreur lors de la génération de suggestions. Veuillez réessayer ultérieurement.";
    }
  }
}

export const aiService = new AIService();
