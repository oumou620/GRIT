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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";

interface ActionSignatureDialogProps {
  actionId: string;
  actionName: string;
  onActionSigned: () => void;
  triggerButton?: React.ReactNode;
}

interface SignatureData {
  signedBy: string;
  comment: string;
}

const ActionSignatureDialog: React.FC<ActionSignatureDialogProps> = ({
  actionId,
  actionName,
  onActionSigned,
  triggerButton,
}) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SignatureData>({
    signedBy: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.signedBy) {
      toast.error("Veuillez indiquer votre nom pour signer");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Mettre à jour le document dans Firestore avec la signature
      const actionRef = doc(db, "actions", actionId);
      await updateDoc(actionRef, {
        status: "completed",
        signature: {
          signedBy: formData.signedBy,
          date: new Date().toISOString(),
          comment: formData.comment,
        },
      });
      
      toast.success("Action signée avec succès");
      setOpen(false);
      setFormData({
        signedBy: "",
        comment: "",
      });
      
      // Notifier le composant parent que l'action a été signée
      onActionSigned();
    } catch (error) {
      console.error("Erreur lors de la signature de l'action:", error);
      toast.error("Erreur lors de la signature");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button variant="outline" className="bg-green-50 hover:bg-green-100 text-green-600 border-green-200">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Signer comme terminé
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit} method="dialog">
          <DialogHeader>
            <DialogTitle>Signer l'action comme terminée</DialogTitle>
            <DialogDescription>
              Vous êtes sur le point de confirmer que l'action "{actionName}" a été réalisée.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="signedBy" className="text-right">
                Votre nom*
              </Label>
              <Input
                id="signedBy"
                name="signedBy"
                placeholder="Prénom et nom"
                className="col-span-3"
                value={formData.signedBy}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comment" className="text-right">
                Commentaire
              </Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Commentaires sur la réalisation de l'action..."
                className="col-span-3"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-4 mt-2">
              <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                <p className="text-amber-800 text-sm">
                  <strong>Note :</strong> En signant cette action, vous confirmez qu'elle a été réalisée 
                  conformément aux exigences et que le risque associé a été correctement traité. 
                  Cette action sera enregistrée avec votre nom et la date actuelle.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
              {isSubmitting ? "Signature en cours..." : "Confirmer et signer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ActionSignatureDialog;
