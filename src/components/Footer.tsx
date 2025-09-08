import { Heart, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-moroccan font-bold text-accent mb-4">
              Riad Ice
            </h3>
            <p className="text-primary-foreground/80 mb-4">
              Where Moroccan Tradition Meets Modern Taste
            </p>
            <p className="text-sm text-primary-foreground/70 font-moroccan">
              حيث تلتقي التقاليد المغربية بالطعم العصري
            </p>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors duration-300">
                <Instagram className="h-5 w-5"
                 onClick={() => window.open('https://www.instagram.com/riad.ice/', '_blank')} />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors duration-300">
                <Facebook className="h-5 w-5" 
                onClick={() => window.open('https://web.facebook.com/riad.ice/?_rdc=1&_rdr#', '_blank')}/>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-accent mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#menu" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  Menu
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-accent transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-accent mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  JHF5+6W2, Âïn-Harrouda, Grand Casablanca, Maroc
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80"> +212 7667 13267</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80">contact@riadice.ma</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-primary-foreground/10 rounded-lg">
              <p className="text-xs text-primary-foreground/70">
                Ouvert tous les jours
              </p>
              <p className="text-sm font-semibold text-accent">
                07:00 - 00:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/70">
            © {currentYear} Riad Ice. Tous droits réservés.
          </p>
          <p className="text-sm text-primary-foreground/70 flex items-center mt-2 md:mt-0">
            Créé avec <Heart className="h-4 w-4 text-accent mx-1 fill-current" /> au Maroc
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;