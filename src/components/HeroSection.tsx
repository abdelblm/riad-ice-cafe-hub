import { ArrowRight, Play, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/utils/whatsapp';
import heroImage from '@/assets/hero-restaurant-exterior.jpg';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Restaurant Name */}
          <h1 className="text-6xl md:text-8xl font-elegant font-bold text-primary-foreground mb-6">
            <span className="text-gradient-moroccan">Riad</span>
            <span className="text-accent"> Ice</span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 font-moroccan">
            Where Moroccan Tradition Meets Modern Taste
          </p>
          
          {/* Subtitle */}
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Découvrez l'authenticité de la cuisine marocaine dans un cadre moderne et élégant
          </p>
          
          {/* Rating */}
          <div className="flex items-center justify-center mb-8 animate-slide-up">
            <div className="flex items-center bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex items-center mr-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-accent fill-current" />
                ))}
              </div>
              <span className="text-primary-foreground/90 text-sm">4.8/5 • 150+ avis</span>
            </div>
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button className="btn-moroccan group">
              Voir le Menu
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Button 
              className="border-2 border-accent text-accent bg-transparent px-8 py-3 rounded-xl font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              onClick={() => openWhatsApp()}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Réserver via WhatsApp
              <span className="hidden sm:inline ml-1">/ Book via WhatsApp</span>
            </Button>
            
            <Button variant="ghost" className="font-semibold px-4 py-2 rounded-xl shadow bg-green-700 text-white hover:bg-green-800 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Commander en Ligne
            </Button>
          </div>
          
          {/* Opening Hours */}
          <div className="mt-12 animate-fade-in">
            <p className="text-primary-foreground/70 text-sm">
              Ouvert tous les jours • 07:00 - 00:00
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 animate-float hidden lg:block">
        <div className="w-20 h-20 bg-accent/20 rounded-full backdrop-blur-sm"></div>
      </div>
      <div className="absolute top-20 right-10 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
        <div className="w-16 h-16 bg-secondary/20 rounded-full backdrop-blur-sm"></div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;