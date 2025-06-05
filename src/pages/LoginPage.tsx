
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthLayout from "@/components/auth/AuthLayout";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    try {
      // Simuler une connexion (à remplacer par Firebase Auth)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email === "demo@example.com" && password === "password") {
        navigate("/dashboard");
      } else {
        setErrorMessage("Identifiants invalides. Veuillez réessayer.");
      }
    } catch (error) {
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Connexion"
      description="Accédez à votre tableau de bord de gestion des risques"
      footer="Pas encore de compte ?"
      footerLink="/register"
      footerLinkText="S'inscrire"
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
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <Link to="/reset-password" className="text-sm text-primary hover:text-primary/80">
                  Mot de passe oublié ?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </Button>
            
            <p className="text-center text-sm text-gray-600">
              Pour tester: demo@example.com / password
            </p>
          </form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
