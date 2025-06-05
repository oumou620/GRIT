
import React from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  footer: string;
  footerLink: string;
  footerLinkText: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  description,
  footer,
  footerLink,
  footerLinkText
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Image Section - Hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center">
        <div className="max-w-md mx-auto p-8 text-primary-foreground">
          <h2 className="text-3xl font-bold mb-6">Sécurisez votre infrastructure IT</h2>
          <p className="text-lg mb-8 opacity-90">
            Notre plateforme vous aide à identifier, évaluer et gérer efficacement tous les risques informatiques de votre organisation.
          </p>
          <div className="space-y-6">
            {[
              "Évaluez la criticité de vos risques",
              "Créez des plans de mitigation",
              "Suivez l'évolution des risques",
              "Générez des rapports détaillés"
            ].map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex justify-center">
              <img 
                src="https://i.postimg.cc/mT8jq7fB/Whats-App-Image-2025-04-15-21-22-26-287a74cf.jpg" 
                alt="GR-IT Logo" 
                className="w-12 h-12 rounded-lg object-cover shadow-md"
              />
            </div>
            <h1 className="mt-6 text-center text-3xl font-bold">{title}</h1>
            <p className="mt-2 text-center text-gray-600">{description}</p>
          </div>
          
          {children}
          
          <p className="mt-8 text-center text-gray-600 text-sm">
            {footer} {' '}
            <Link to={footerLink} className="font-medium text-primary hover:text-primary/80">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
