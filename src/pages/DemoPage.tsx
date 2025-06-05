import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DemoPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* NavBar */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo remplacé */}
            <img 
              src="https://i.postimg.cc/mT8jq7fB/Whats-App-Image-2025-04-15-21-22-26-287a74cf.jpg" 
              alt="GR-IT Logo" 
              className="w-8 h-8 rounded-lg object-cover shadow-md"
            />
            <span className="ml-3 text-xl font-bold logo-text">GR-IT</span>
          </div>
          <div>
            <Link to="/">
              <Button variant="outline" className="mr-2">Retour à l'accueil</Button>
            </Link>
            <Link to="/login">
              <Button>Se connecter</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Demo Content */}
      <main className="flex-grow container mx-auto py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Démonstration de GR-IT</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Découvrez notre plateforme en action</h2>
            <p className="text-gray-600 mb-6">
              Cette démo vous présente les fonctionnalités principales de notre solution de gestion des risques informatiques.
            </p>
            
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center p-8">
                <p className="text-xl font-medium mb-4">Vidéo de démonstration</p>
                <Button>Regarder la vidéo</Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              Pour une expérience complète, nous vous recommandons de créer un compte ou d'utiliser nos identifiants de démonstration.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Essayer la démo interactive</h3>
              <p className="text-gray-600 mb-4">
                Accédez à un compte de démonstration préconfiguré avec des exemples de risques et des données fictives.
              </p>
              <Link to="/login">
                <Button className="w-full">
                  Accéder à la démo
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                Identifiants: demo@example.com / password
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-3">Créer votre propre compte</h3>
              <p className="text-gray-600 mb-4">
                Commencez avec un environnement vierge et découvrez comment configurer votre registre des risques.
              </p>
              <Link to="/register">
                <Button variant="outline" className="w-full">
                  Créer un compte
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-6 text-center text-gray-600">
          &copy; {new Date().getFullYear()} GR-IT - Version de démonstration
        </div>
      </footer>
    </div>
  );
};

export default DemoPage;
