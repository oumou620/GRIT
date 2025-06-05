import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simuler un envoi de formulaire
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      toast.success("Votre message a été envoyé avec succès !");
    } catch (error) {
      toast.error("Une erreur s'est produite. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* NavBar */}
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {/* Logo remplacé */}
              <img 
                src="https://i.postimg.cc/mT8jq7fB/Whats-App-Image-2025-04-15-21-22-26-287a74cf.jpg" 
                alt="GR-IT Logo" 
                className="w-8 h-8 rounded-lg object-cover shadow-md"
              />
              <span className="ml-3 text-xl font-bold logo-text">GR-IT</span>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <Button variant="outline" className="mr-2">Se connecter</Button>
            </Link>
            <Link to="/register">
              <Button>S'inscrire</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Contact Content */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-xl text-gray-600 mb-8">
              Nous sommes là pour répondre à vos questions et vous aider à sécuriser votre environnement informatique.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold mb-2">Téléphone</h2>
                <p className="text-gray-600">+33 (0)1 23 45 67 89</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold mb-2">Email</h2>
                <p className="text-gray-600">contact@riskmanager.com</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold mb-2">Adresse</h2>
                <p className="text-gray-600">123 Avenue de la Sécurité<br />75008 Paris, France</p>
              </div>
            </div>
            
            {isSubmitted ? (
              <Card className="shadow-md mb-12">
                <CardContent className="pt-6 p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-600 mb-4">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">Message envoyé !</h2>
                  <p className="text-gray-600 mb-6">
                    Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Envoyer un nouveau message</Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-md mb-12">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Entreprise</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-80 bg-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <p className="text-center">Carte interactive indisponible en prévisualisation.<br />Une carte Google Maps s'afficherait ici dans la version finale.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                {/* Logo remplacé */}
                <img 
                  src="https://i.postimg.cc/mT8jq7fB/Whats-App-Image-2025-04-15-21-22-26-287a74cf.jpg" 
                  alt="GR-IT Logo" 
                  className="w-8 h-8 rounded-lg object-cover shadow-md"
                />
                <span className="ml-3 text-xl font-bold text-white logo-text">GR-IT</span>
              </div>
              <p className="text-gray-400">
                La solution complète pour la gestion des risques informatiques de votre organisation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Produit</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ressources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/documentation" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Webinaires</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/legal" className="hover:text-white transition-colors">Mentions légales</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} GR-IT. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
