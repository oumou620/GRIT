import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
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

      {/* About Content */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">À propos de GR-IT</h1>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-4">Notre mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                Chez GR-IT, notre mission est de fournir aux organisations de toutes tailles les outils et méthodologies nécessaires pour identifier, évaluer et gérer efficacement leurs risques informatiques.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Nous croyons qu'une gestion proactive des risques est essentielle pour la résilience et la continuité des activités dans un monde numérique en constante évolution.
              </p>
              <p className="text-lg text-gray-700">
                Notre plateforme intuitive et complète permet aux équipes de sécurité et aux dirigeants de prendre des décisions éclairées, basées sur des données, pour protéger leur organisation contre les menaces émergentes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-3">Notre histoire</h2>
                <p className="text-gray-700">
                  Fondée en 2020 par une équipe d'experts en cybersécurité et en gestion des risques, GR-IT est née de la conviction que les organisations avaient besoin d'une approche plus structurée et plus accessible pour gérer leurs risques informatiques.
                </p>
                <p className="text-gray-700 mt-2">
                  Depuis, notre entreprise n'a cessé de croître, accompagnant des clients dans divers secteurs tels que la finance, la santé, l'industrie et les services publics.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-3">Nos valeurs</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Excellence :</strong> Nous nous efforçons constamment d'améliorer notre plateforme et nos services.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Intégrité :</strong> Nous agissons avec honnêteté et transparence dans toutes nos interactions.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Innovation :</strong> Nous recherchons sans cesse de nouvelles approches pour répondre aux défis de sécurité émergents.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span><strong>Collaboration :</strong> Nous travaillons en étroite collaboration avec nos clients et partenaires.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-6">Notre équipe</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Sophie Martin",
                    role: "CEO & Co-fondatrice",
                    bio: "Plus de 15 ans d'expérience en gestion des risques et cybersécurité."
                  },
                  {
                    name: "Thomas Dubois",
                    role: "CTO & Co-fondateur",
                    bio: "Expert en développement logiciel et architecture de sécurité."
                  },
                  {
                    name: "Julie Lefebvre",
                    role: "Directrice Produit",
                    bio: "Spécialiste en UX et en conception de solutions de gestion des risques."
                  },
                  {
                    name: "Alexandre Bernard",
                    role: "Responsable Commercial",
                    bio: "Expérience dans le conseil en sécurité et développement commercial."
                  },
                  {
                    name: "Marie Legrand",
                    role: "Lead Développeur",
                    bio: "Développeuse full-stack avec expertise en applications sécurisées."
                  },
                  {
                    name: "Nicolas Petit",
                    role: "Expert en Cybersécurité",
                    bio: "Certifié CISSP, spécialiste des audits de sécurité et tests d'intrusion."
                  }
                ].map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3"></div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-primary text-sm mb-1">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold mb-6">Prêt à renforcer la sécurité de votre organisation ?</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button size="lg">Commencer gratuitement</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">Nous contacter</Button>
                </Link>
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
                <span className="ml-3 text-xl font-bold text-white logo-text">RiskManager</span>
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

export default AboutPage;
