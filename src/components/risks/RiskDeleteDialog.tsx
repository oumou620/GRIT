import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";

interface RiskDeleteDialogProps {
  riskId: string;
  riskName: string;
  onRiskDeleted: () => void;
  triggerButton?: React.ReactNode;
}

const RiskDeleteDialog: React.FC<RiskDeleteDialogProps> = ({
  riskId,
  riskName,
  onRiskDeleted,
  triggerButton,
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Supprimer le risque de Firestore
      await deleteDoc(doc(db, "risks", riskId));
      toast.success("Risque supprimé avec succès");
      
      // Notifier le composant parent que le risque a été supprimé
      onRiskDeleted();
    } catch (error) {
      console.error("Erreur lors de la suppression du risque:", error);
      toast.error("Erreur lors de la suppression du risque");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {triggerButton || (
          <Button variant="destructive" size="sm">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Supprimer
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce risque ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer le risque "{riskName}". Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RiskDeleteDialog;
