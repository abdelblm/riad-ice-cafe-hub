import { Heart, Users, Award, Coffee } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: 'Authenticité',
      titleAr: 'الأصالة',
      description: 'Recettes traditionnelles transmises de génération en génération'
    },
    {
      icon: Users,
      title: 'Convivialité',
      titleAr: 'الضيافة',
      description: 'Un accueil chaleureux dans l\'esprit de l\'hospitalité marocaine'
    },
    {
      icon: Award,
      title: 'Qualité',
      titleAr: 'الجودة',
      description: 'Ingrédients frais et préparations artisanales de haute qualité'
    },
    {
      icon: Coffee,
      title: 'Modernité',
      titleAr: 'العصرية',
      description: 'Ambiance contemporaine alliant tradition et innovation culinaire'
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-elegant font-bold text-primary mb-4">
            Notre <span className="text-gradient-moroccan">Histoire</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Riad Ice est né de la passion de faire découvrir la richesse de la cuisine marocaine 
            dans un cadre moderne et accueillant
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Story Content */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-elegant font-semibold text-primary mb-6">
              Une Fusion de <span className="text-accent">Traditions</span> et d'<span className="text-secondary">Innovation</span>
            </h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Situé au cœur de la ville, Riad Ice incarne l'âme du Maroc à travers ses saveurs 
                authentiques et son hospitalité légendaire. Notre restaurant propose une expérience 
                culinaire unique où se mélangent harmonieusement traditions ancestrales et modernité.
              </p>
              
              <p>
                De notre couscous royal servi le vendredi à nos milkshakes signature, chaque plat 
                raconte une histoire, celle de la passion culinaire marocaine sublimée par une 
                approche contemporaine.
              </p>
              
              <p>
                Notre espace moderne, avec son design élégant et ses écrans pour suivre les matchs 
                de football, fait de Riad Ice bien plus qu'un restaurant : un véritable lieu de 
                rencontre et de partage.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-accent/10 rounded-xl">
                <h4 className="text-2xl font-bold text-accent">150+</h4>
                <p className="text-sm text-muted-foreground">Clients Satisfaits</p>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-xl">
                <h4 className="text-2xl font-bold text-secondary">5</h4>
                <p className="text-sm text-muted-foreground">Années d'Excellence</p>
              </div>
            </div>
          </div>

          {/* Image Placeholder - Would be restaurant interior */}
          <div className="animate-scale-in">
            <div className="relative">
              <div className="bg-gradient-warm rounded-2xl h-96 flex items-center justify-center shadow-moroccan">
                <div className="text-center text-primary-foreground/80">
                  <Coffee className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-moroccan">Intérieur du Restaurant</p>
                  <p className="text-sm">Photo à venir</p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/20 rounded-full backdrop-blur-sm animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="card-moroccan text-center group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="p-6">
                <div className="mb-4">
                  <value.icon className="h-12 w-12 text-accent mx-auto group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">{value.title}</h3>
                <p className="text-sm text-muted-foreground font-moroccan mb-3">{value.titleAr}</p>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;