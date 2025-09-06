import { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Accueil', href: '#home', nameAr: 'الرئيسية' },
    { name: 'À Propos', href: '#about', nameAr: 'من نحن' },
    { name: 'Menu', href: '#menu', nameAr: 'القائمة' },
    { name: 'Galerie', href: '#gallery', nameAr: 'المعرض' },
    { name: 'Réservation', href: '#reservation', nameAr: 'حجز' },
    { name: 'Contact', href: '#contact', nameAr: 'اتصل بنا' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-moroccan font-bold text-accent">
              Riad Ice
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-primary-foreground hover:text-accent px-3 py-2 text-sm font-medium transition-colors duration-300 hover:scale-105"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-primary-foreground/80 text-sm">
              <Phone className="h-4 w-4 mr-1" />
              <span>+212 123 456 789</span>
            </div>
            <Button variant="outline" size="sm" className="btn-outline-moroccan text-xs">
              Réserver
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-foreground hover:text-accent"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-primary/95 backdrop-blur-md border-t border-border/20">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-primary-foreground hover:text-accent block px-3 py-2 text-base font-medium transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-2 border-t border-border/20 mt-4">
              <div className="flex items-center text-primary-foreground/80 text-sm px-3 py-2">
                <Phone className="h-4 w-4 mr-2" />
                <span>+212 123 456 789</span>
              </div>
              <Button className="btn-moroccan mx-3 mt-2 w-full">
                Réserver une Table
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;