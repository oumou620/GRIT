import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BlogPage: React.FC = () => {
  // Articles de blog fictifs
  const blogPosts = [
    {
      id: 1,
      title: "Les meilleures pratiques pour la gestion des risques informatiques",
      excerpt: "Découvrez comment mettre en place une stratégie efficace de gestion des risques informatiques dans votre organisation.",
      date: "10 mai 2023",
      author: "Sophie Martin",
      imageUrl: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Bonnes pratiques"
    },
    {
      id: 2,
      title: "Comment réaliser un audit de sécurité informatique",
      excerpt: "Guide complet pour effectuer un audit de sécurité informatique efficace au sein de votre entreprise.",
      date: "2 mai 2023",
      author: "Thomas Dupont",
      imageUrl: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
      category: "Sécurité"
    },
    {
      id: 3,
      title: "L'importance de la cartographie des risques",
      excerpt: "Pourquoi la cartographie des risques est essentielle pour votre organisation et comment la mettre en place.",
      date: "25 avril 2023",
      author: "Julie Lefebvre",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Méthodologie"
    },
    {
      id: 4,
      title: "Les normes ISO pour la gestion des risques",
      excerpt: "Présentation des normes ISO 27001, 27005 et 31000 pour la gestion des risques informatiques.",
      date: "18 avril 2023",
      author: "Alexandre Moreau",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Conformité"
    },
    {
      id: 5,
      title: "Gérer efficacement la communication lors d'un incident de sécurité",
      excerpt: "Comment communiquer efficacement en interne et en externe lors d'un incident de sécurité informatique.",
      date: "10 avril 2023",
      author: "Émilie Bernard",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "Gestion de crise"
    },
    {
      id: 6,
      title: "Les outils essentiels pour la gestion des risques informatiques",
      excerpt: "Découvrez les meilleurs outils pour faciliter la gestion des risques informatiques dans votre organisation.",
      date: "2 avril 2023",
      author: "Nicolas Dubois",
      imageUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
      category: "Outils"
    }
  ];

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

      {/* Blog Content */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nos derniers articles sur la gestion des risques informatiques et la cybersécurité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:translate-y-[-5px]">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-primary font-medium">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Par {post.author}</span>
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="link" className="p-0">Lire la suite</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
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

export default BlogPage;
