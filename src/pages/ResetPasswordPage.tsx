import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    try {
      // Simuler une réinitialisation de mot de passe
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      console.error("Reset password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Réinitialisation de mot de passe"
        description="Vérifiez votre boîte mail"
        footer="Vous avez retrouvé votre mot de passe ?"
        footerLink="/login"
        footerLinkText="Se connecter"
      >
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium">E-mail envoyé</h3>
              <p className="text-muted-foreground">
                Si un compte existe avec l'adresse <strong>{email}</strong>, vous recevrez un lien de réinitialisation de mot de passe.
              </p>
              <div className="pt-4">
                <Link to="/login">
                  <Button className="w-full">Retour à la connexion</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Réinitialisation de mot de passe"
      description="Saisissez votre e-mail pour recevoir un lien de réinitialisation"
      footer="Vous avez retrouvé votre mot de passe ?"
      footerLink="/login"
      footerLinkText="Se connecter"
    >
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nom@entreprise.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
