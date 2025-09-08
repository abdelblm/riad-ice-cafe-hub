import { Star, Clock, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import couscousImage from '@/assets/couscous-hero.jpg';
import pastillaImage from '@/assets/pastilla-hero.jpg';
import milkshakeImage from '@/assets/milkshake-hero.jpg';



const MenuHighlights = () => {
  const specialties = [
    {
      name: 'Couscous Royal',
      nameAr: 'كسكس ملكي',
      description: 'Couscous traditionnel aux légumes et viande tendre, servi le vendredi',
      price: '85 MAD',
      image: couscousImage,
      category: 'Tradition',
      rating: 4.9,
      time: '25 min',
      isSpecial: true,
      day: 'Vendredi'
    },
    {
      name: 'Pastilla au Poulet',
      nameAr: 'بسطيلة بالدجاج',
      description: 'Feuilleté croustillant au poulet, amandes et épices marocaines',
      price: '65 MAD',
      image: pastillaImage,
      category: 'Tradition',
      rating: 4.8,
      time: '20 min',
      isSpecial: false
    },
    {
      name: 'Milkshake Signature',
      nameAr: 'ميلك شيك مميز',
      description: 'Milkshake crémeux aux fruits frais et chantilly artisanale',
      price: '35 MAD',
      image: milkshakeImage,
      category: 'Moderne',
      rating: 4.7,
      time: '5 min',
      isSpecial: false
    }
  ];

  const dailySpecials = [
    { day: 'Mercredi', dish: 'Rfissa', price: '70 MAD' },
    { day: 'Vendredi', dish: 'Couscous Royal', price: '85 MAD' },
    { day: 'Dimanche', dish: 'Tajine Agneau', price: '90 MAD' }
  ];

  return (
    <section id="menu" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-elegant font-bold text-primary mb-4">
            Nos <span className="text-gradient-moroccan">Spécialités</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une fusion parfaite entre l'authenticité marocaine et la modernité culinaire
          </p>
        </div>

        {/* Featured Dishes */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {specialties.map((item, index) => (
            <Card key={index} className="card-moroccan group cursor-pointer overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {item.isSpecial && (
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Spécial {item.day}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-primary/80 text-primary-foreground px-2 py-1 rounded-full text-sm">
                  {item.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-elegant font-semibold text-primary">{item.name}</h3>
                  <span className="text-2xl font-bold text-accent">{item.price}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-1 font-moroccan">{item.nameAr}</p>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-accent mr-1" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="group">
                    <Utensils className="h-4 w-4 mr-1 group-hover:rotate-12 transition-transform duration-300" />
                    Commander
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Daily Specials */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 animate-fade-in">
          <h3 className="text-2xl font-elegant font-bold text-center mb-8">
            Spécialités <span className="text-accent">Hebdomadaires</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {dailySpecials.map((special, index) => (
              <div key={index} className="text-center p-4 bg-primary-foreground/10 rounded-xl backdrop-blur-sm">
                <h4 className="font-bold text-accent mb-2">{special.day}</h4>
                <p className="text-lg font-moroccan mb-1">{special.dish}</p>
                <p className="text-2xl font-bold">{special.price}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button className="btn-moroccan">
              Voir le Menu Complet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuHighlights;