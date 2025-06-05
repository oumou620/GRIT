
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Animation au défilement
const fadeInOnScroll = (element: HTMLElement) => {
  const distanceFromTop = window.pageYOffset + element.getBoundingClientRect().top;
  const elementHeight = element.offsetHeight;
  const scrollTop = document.documentElement.scrollTop;
  
  const opacity = Math.min(1, (scrollTop - distanceFromTop + 700) / elementHeight);
  
  if (opacity >= 0) {
    element.style.opacity = opacity.toString();
    element.style.transform = `translateY(${20 * (1 - opacity)}px)`;
  }
};

// Hook pour l'animation au défilement
const useFadeOnScroll = () => {
  React.useEffect(() => {
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll('.fade-on-scroll');
      fadeElements.forEach(element => {
        fadeInOnScroll(element as HTMLElement);
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialisation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

const LandingPage = () => {
  useFadeOnScroll();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* NavBar - Style moderne et coloré */}
      <header className="bg-white/80 backdrop-blur-md py-5 px-6 sticky top-0 z-50 border-b border-indigo-100">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://i.postimg.cc/mT8jq7fB/Whats-App-Image-2025-04-15-21-22-26-287a74cf.jpg" 
              alt="Risk Nexus Guardian Logo" 
              className="w-12 h-12 rounded-xl object-cover shadow-lg shadow-indigo-200"
            />
            <span className="ml-3 text-2xl font-extrabold logo-text">GR-IT</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50 font-medium">Se connecter</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white font-medium px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
                S'inscrire gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Design vibrant avec plus d'images et d'effets */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Cercles décoratifs en arrière-plan */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-fuchsia-200/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 font-semibold text-sm">
                Solution #1 de Gestion des Risques
              </div>
              
              <h1 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-br from-indigo-800 via-purple-700 to-fuchsia-700 bg-clip-text text-transparent">Transformez votre approche de la</span><br className="hidden md:block"/> 
                <span className="relative bg-gradient-to-br from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">sécurité informatique<span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span></span>
              </h1>
              
              <p className="text-xl mb-8 text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Identifiez, analysez et mitigez efficacement tous vos risques informatiques avec une plateforme intuitive et puissante qui révolutionne la cybersécurité.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-700 hover:to-fuchsia-700 text-white text-lg font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <span className="relative z-10">Démarrer maintenant</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="outline" className="border-2 border-indigo-500 text-indigo-700 hover:bg-indigo-50 text-lg font-medium px-8 py-4 rounded-full transition-all duration-200">
                    <span>Voir la démo</span>
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[400px] rounded-xl shadow-2xl overflow-hidden">
                <img 
                  src="https://img.freepik.com/free-photo/teleworker-home-office-editing-documents-notebook_482257-116358.jpg?t=st=1746964867~exp=1746968467~hmac=d1630d7990c49292860cb995ed6bb23591ca0ee5a843e73501be9e3116198efe&w=740" 
                  alt="Professionnelle travaillant sur la gestion des risques" 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-2xl rotate-6 opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br from-fuchsia-400 to-pink-400 rounded-2xl -rotate-6 opacity-20 blur-2xl"></div>
            </div>
          </div>
          
          {/* Statistiques animées */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 text-center">
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">99%</div>
              <div className="text-gray-700">Taux de satisfaction client</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">85%</div>
              <div className="text-gray-700">Réduction des incidents</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-700">Entreprises clientes</div>
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-100 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-extrabold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-700">Support technique</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Style moderne et coloré */}
      <section className="py-24 bg-gradient-to-br from-white to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-on-scroll">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 font-semibold text-sm mb-4">
              Fonctionnalités Exceptionnelles
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
              Une plateforme complète pour votre sécurité
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Découvrez comment notre solution révolutionne la gestion des risques informatiques avec des outils innovants et intuitifs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Identification des risques",
                description: "Catégorisez et visualisez tous vos risques informatiques par nature, source et impact.",
                icon: "shield-check",
                color: "from-indigo-600 to-indigo-400",
                delay: "0ms"
              },
              {
                title: "Analyse avancée",
                description: "Évaluez la probabilité et l'impact de chaque risque grâce à notre matrice de risques interactive.",
                icon: "bar-chart-2",
                color: "from-purple-600 to-purple-400",
                delay: "100ms"
              },
              {
                title: "Plans d'action intelligents",
                description: "Créez et suivez des plans d'action, avec attribution automatique des responsabilités.",
                icon: "clipboard-check",
                color: "from-fuchsia-600 to-fuchsia-400",
                delay: "200ms"
              },
              {
                title: "Alertes en temps réel",
                description: "Recevez des notifications instantanées pour les risques critiques et les échéances imminentes.",
                icon: "bell",
                color: "from-pink-600 to-pink-400",
                delay: "300ms"
              },
              {
                title: "Rapports automatisés",
                description: "Générez des rapports détaillés et des tableaux de bord personnalisables en un clic.",
                icon: "file-text",
                color: "from-indigo-600 to-purple-400",
                delay: "400ms"
              },
              {
                title: "Gestion des accès sécurisée",
                description: "Définissez avec précision les droits d'accès selon les rôles et responsabilités de chacun.",
                icon: "lock",
                color: "from-purple-600 to-fuchsia-400",
                delay: "500ms"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                style={{animationDelay: feature.delay}}
              >
                <div className="mb-6 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {feature.icon === "shield-check" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    )}
                    {feature.icon === "bar-chart-2" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    )}
                    {feature.icon === "clipboard-check" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    )}
                    {feature.icon === "bell" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    )}
                    {feature.icon === "file-text" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    )}
                    {feature.icon === "lock" && (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    )}
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link to="/register">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                Découvrir toutes les fonctionnalités
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Design moderne et coloré */}
      <section className="py-24 relative overflow-hidden">
        {/* Formes décoratives en arrière-plan */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full opacity-70 -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full opacity-70 -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 fade-on-scroll">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 font-semibold text-sm mb-4">
              Témoignages Clients
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Découvrez comment nos clients ont transformé leur approche de la gestion des risques avec notre solution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-on-scroll">
            {[
              {
                quote: "Depuis que nous utilisons GR-IT, notre visibilité sur nos risques informatiques s'est améliorée de 80% et nous avons réduit nos incidents de sécurité de moitié.",
                author: "Marie Dupont",
                role: "RSSI, Entreprise Technologie",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                company: "TechSecure",
                color: "from-indigo-500 to-indigo-700"
              },
              {
                quote: "L'interface intuitive et la matrice des risques nous ont permis d'identifier des vulnérabilités critiques que nous avions complètement manquées auparavant.",
                author: "Jean Martin",
                role: "Responsable IT, Secteur Bancaire",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                company: "BankSecure",
                color: "from-purple-500 to-purple-700"
              },
              {
                quote: "GR-IT a transformé notre approche de la cybersécurité. La solution est devenue indispensable et fait maintenant partie intégrante de notre stratégie IT.",
                author: "Sophie Lefebvre",
                role: "Consultante Cybersécurité",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
                company: "CyberConsult",
                color: "from-fuchsia-500 to-fuchsia-700"
              }
            ].map((testimonial, index) => (
              <div key={index} className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                {/* Bordure colorée en haut */}
                <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${testimonial.color} rounded-t-2xl`}></div>
                
                <div className="flex items-center mb-6">
                  <div className="mr-4 flex-shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full border-2 border-indigo-100"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-gray-800">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-indigo-600 font-semibold">{testimonial.company}</div>
                  </div>
                </div>
                
                <div className="text-gray-700 italic mb-6 relative">
                  <div className="absolute -top-2 -left-2 text-indigo-200 text-4xl opacity-40">“</div>
                  <div className="relative z-10">"{testimonial.quote}"</div>
                  <div className="absolute -bottom-6 -right-2 text-indigo-200 text-4xl opacity-40">”</div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-500">Client depuis 2 ans</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center fade-on-scroll">
            <Link to="/testimonials">
              <Button variant="outline" className="border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 font-medium px-8 py-3 rounded-full transition-all duration-200">
                Voir tous les témoignages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Design vibrant */}
      <section className="py-20 relative overflow-hidden">
        {/* Arrière-plan avec dégradé */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-800"></div>
        
        {/* Formes décoratives */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-fuchsia-600 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 fade-on-scroll">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white/10 backdrop-blur-lg p-12 shadow-2xl border border-white/20">
            <div className="text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-white/20 text-white font-semibold text-sm mb-6">
                Rejoignez +500 entreprises sécurisées
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
                Prêt à transformer votre sécurité informatique ?
              </h2>
              
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Démarrez dès aujourd'hui et rejoignez les organisations qui ont réduit leurs incidents de sécurité de 85% grâce à notre plateforme.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/register">
                  <Button className="bg-white text-indigo-800 hover:bg-white/90 text-lg font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    Démarrer gratuitement
                  </Button>
                </Link>
                
                <Link to="/demo">
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg font-medium px-8 py-4 rounded-full transition-all duration-200">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Voir la démonstration
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center gap-8">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Essai gratuit de 14 jours</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Configuration rapide</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Support premium inclus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Design moderne et coloré */}
      <footer className="pt-20 pb-10 bg-gradient-to-b from-gray-900 to-indigo-950 text-gray-300 relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img 
                  src="https://i.postimg.cc/mT8jq7fB/Whats-App-Image-2025-04-15-21-22-26-287a74cf.jpg" 
                  alt="GR-IT Logo" 
                  className="w-12 h-12 rounded-xl object-cover shadow-lg shadow-indigo-900/30"
                />
                <span className="ml-3 text-2xl font-extrabold logo-text">GR-IT</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                La solution innovante qui révolutionne la gestion des risques informatiques grâce à une plateforme intuitive et puissante.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-700 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-700 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-700 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-700 flex items-center justify-center transition-colors duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Produit</h3>
              <ul className="space-y-4">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Démonstration</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Ressources</h3>
              <ul className="space-y-4">
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/documentation" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Webinaires</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Partenaires</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Entreprise</h3>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">À propos</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/legal" className="text-gray-400 hover:text-white transition-colors">Mentions légales</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Carrières</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} GR-IT. Tous droits réservés.
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <Link to="/legal" className="hover:text-white transition-colors">Confidentialité</Link>
              <span>|</span>
              <Link to="/legal" className="hover:text-white transition-colors">Conditions d'utilisation</Link>
              <span>|</span>
              <Link to="/legal" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
