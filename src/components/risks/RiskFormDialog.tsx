import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AIAssistant from "@/components/ai/AIAssistant";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";

// Type pour les risques
export interface Risk {
  id?: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  system: string;
  type: string;
  date: string;
  responsible: string;
  status: "new" | "in-progress" | "mitigated";
  impact?: number;
  probability?: number;
}

interface RiskFormDialogProps {
  onRiskAdded: () => void;
  triggerButton?: React.ReactNode;
}

const RiskFormDialog: React.FC<RiskFormDialogProps> = ({
  onRiskAdded,
  triggerButton,
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<Risk, "id">>({
    name: "",
    description: "",
    severity: "medium",
    system: "",
    type: "Technique",
    date: new Date().toISOString().split("T")[0],
    responsible: "",
    status: "new",
    impact: 3,
    probability: 3,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // Empêcher le comportement par défaut du formulaire (rechargement de la page)
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.system || !formData.responsible) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Ajout du risque à Firestore
      await addDoc(collection(db, "risks"), {
        ...formData,
        createdAt: new Date(),
      });
      
      toast.success("Risque ajouté avec succès");
      setOpen(false);
      setFormData({
        name: "",
        description: "",
        severity: "medium",
        system: "",
        type: "Technique",
        date: new Date().toISOString().split("T")[0],
        responsible: "",
        status: "new",
        impact: 3,
        probability: 3,
      });
      
      // Notifier le composant parent que le risque a été ajouté
      onRiskAdded();
    } catch (error) {
      console.error("Erreur lors de l'ajout du risque:", error);
      toast.error("Erreur lors de l'ajout du risque");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button>
            <svg
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Ajouter un risque
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} method="dialog" className="py-2">
          <DialogHeader className="pb-2">
            <DialogTitle>Ajouter un nouveau risque</DialogTitle>
            <DialogDescription className="text-sm">
              Complétez les informations du risque à ajouter au registre.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom*
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Attaque par ransomware, Fuite de données..."
                className="col-span-3"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description*
              </Label>
              <div className="col-span-3 space-y-4">
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Décrivez le risque en détail, son contexte et ses potentielles conséquences..."
                  className="w-full"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                
                {/* Assistant IA pour analyser la description du risque */}
                {formData.description.trim().length > 20 && (
                  <AIAssistant 
                    mode="analyze" 
                    inputText={formData.description} 
                  />
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="severity" className="text-right">
                Sévérité
              </Label>
              <Select
                value={formData.severity}
                onValueChange={(value) => handleSelectChange("severity", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une sévérité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critique</SelectItem>
                  <SelectItem value="high">Élevé</SelectItem>
                  <SelectItem value="medium">Moyen</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="system" className="text-right">
                Système*
              </Label>
              <Input
                id="system"
                name="system"
                placeholder="Ex: Serveurs de fichiers, Base de données, VPN..."
                className="col-span-3"
                value={formData.system}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Technique">Technique</SelectItem>
                  <SelectItem value="Humain">Humain</SelectItem>
                  <SelectItem value="Organisationnel">Organisationnel</SelectItem>
                  <SelectItem value="Financier">Financier</SelectItem>
                  <SelectItem value="Légal">Légal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                className="col-span-3"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="responsible" className="text-right">
                Responsable*
              </Label>
              <Input
                id="responsible"
                name="responsible"
                placeholder="Nom de la personne responsable de ce risque"
                className="col-span-3"
                value={formData.responsible}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Statut
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Nouveau</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="mitigated">Mitigé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="impact" className="text-right">
                Impact
              </Label>
              <Select
                value={formData.impact?.toString()}
                onValueChange={(value) => handleSelectChange("impact", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Niveau d'impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Très faible</SelectItem>
                  <SelectItem value="2">2 - Faible</SelectItem>
                  <SelectItem value="3">3 - Moyen</SelectItem>
                  <SelectItem value="4">4 - Élevé</SelectItem>
                  <SelectItem value="5">5 - Critique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="probability" className="text-right">
                Probabilité
              </Label>
              <Select
                value={formData.probability?.toString()}
                onValueChange={(value) => handleSelectChange("probability", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Niveau de probabilité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Rare</SelectItem>
                  <SelectItem value="2">2 - Peu probable</SelectItem>
                  <SelectItem value="3">3 - Possible</SelectItem>
                  <SelectItem value="4">4 - Probable</SelectItem>
                  <SelectItem value="5">5 - Très probable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-6 border-t pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="mr-2">
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-white font-medium">
              {isSubmitting ? "Ajout en cours..." : "Ajouter le risque"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RiskFormDialog;
