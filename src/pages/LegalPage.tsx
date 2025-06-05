import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LegalPage: React.FC = () => {
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

      {/* Legal Content */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Mentions légales</h1>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Informations légales</h2>
              <p className="text-gray-700 mb-4">
                Le site GR-IT est édité par la société GR-IT SAS, société par actions simplifiée au capital de 50 000 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Siège social :</strong> 123 Avenue de la Sécurité, 75008 Paris, France<br />
                <strong>Numéro de téléphone :</strong> +33 (0)1 23 45 67 89<br />
                <strong>Email :</strong> contact@riskmanager.com<br />
                <strong>Directeur de la publication :</strong> Sophie Martin, Présidente<br />
                <strong>Numéro de TVA intracommunautaire :</strong> FR 12 345 678 901
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
              <p className="text-gray-700">
                Le site RiskManager est hébergé par la société OVH SAS, société par actions simplifiée au capital de 10 069 020 euros, immatriculée au Registre du Commerce et des Sociétés de Lille Métropole sous le numéro 424 761 419.
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Siège social :</strong> 2 rue Kellermann, 59100 Roubaix, France<br />
                <strong>Numéro de téléphone :</strong> +33 (0)8 99 70 17 61
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
              <p className="text-gray-700 mb-4">
                L'ensemble des éléments composant le site RiskManager (textes, graphismes, logiciels, photographies, images, vidéos, sons, plans, logos, marques, etc.) ainsi que le site lui-même, sont la propriété exclusive de RiskManager SAS ou des titulaires de droits avec lesquels RiskManager a passé des accords.
              </p>
              <p className="text-gray-700 mb-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de RiskManager SAS.
              </p>
              <p className="text-gray-700">
                Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Protection des données personnelles</h2>
              <p className="text-gray-700 mb-4">
                RiskManager SAS s'engage à respecter la confidentialité des données personnelles communiquées par les utilisateurs du site et à les traiter dans le respect de la loi Informatique et Libertés du 6 janvier 1978 modifiée et du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données (RGPD).
              </p>
              <p className="text-gray-700 mb-4">
                Les utilisateurs disposent d'un droit d'accès, de rectification, d'effacement, de limitation, de portabilité et d'opposition aux données les concernant. Ils peuvent exercer ces droits en adressant un email à dpo@riskmanager.com ou un courrier à l'adresse suivante : RiskManager SAS - DPO, 123 Avenue de la Sécurité, 75008 Paris, France.
              </p>
              <p className="text-gray-700">
                Pour plus d'informations concernant la collecte et le traitement de vos données personnelles, veuillez consulter notre <Link to="/privacy" className="text-primary hover:underline">Politique de confidentialité</Link>.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
              <p className="text-gray-700 mb-4">
                Le site RiskManager utilise des cookies pour améliorer l'expérience utilisateur. Un cookie est un petit fichier texte envoyé à votre navigateur via le site web consulté. Il permet de conserver des données utilisateur afin de faciliter la navigation et de permettre certaines fonctionnalités.
              </p>
              <p className="text-gray-700 mb-4">
                Les utilisateurs peuvent désactiver les cookies en paramétrant leur navigateur internet. Cependant, certaines fonctionnalités du site pourraient ne plus être disponibles.
              </p>
              <p className="text-gray-700">
                Pour plus d'informations concernant l'utilisation des cookies, veuillez consulter notre <Link to="/cookies" className="text-primary hover:underline">Politique des cookies</Link>.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4">Limitation de responsabilité</h2>
              <p className="text-gray-700 mb-4">
                RiskManager SAS s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des informations diffusées sur le site, dont elle se réserve le droit de corriger, à tout moment et sans préavis, le contenu. Toutefois, RiskManager SAS ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur le site.
              </p>
              <p className="text-gray-700 mb-4">
                RiskManager SAS décline toute responsabilité :
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                <li>pour toute interruption du site ;</li>
                <li>pour toute survenance de bugs ;</li>
                <li>pour toute inexactitude ou omission portant sur des informations disponibles sur le site ;</li>
                <li>pour tous dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à la disposition sur le site ;</li>
                <li>et plus généralement de tout dommage direct ou indirect, quelles qu'en soient les causes, origines, nature ou conséquences.</li>
              </ul>
              <p className="text-gray-700">
                Les utilisateurs du site sont tenus de respecter les dispositions de la loi Informatique et Libertés, dont la violation est passible de sanctions pénales. Ils doivent notamment s'abstenir de toute collecte, de toute utilisation détournée, et d'une manière générale, de tout acte susceptible de porter atteinte à la vie privée ou à la réputation des personnes.
              </p>
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

export default LegalPage;
