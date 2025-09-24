import { MapPin, Phone, Clock, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'JHF5+6W2, Âïn-Harrouda, Grand Casablanca, Maroc',
      contentAr:
        'شارع محمد الخامس، الدار البيضاعين حرودة، الدار البيضاء الكبرى، المغرب',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: ' +212 6932 54604',
      contentAr: ' +212 6932 54604',
    },
    {
      icon: Clock,
      title: 'Horaires',
      content: 'Tous les jours: 07:00 - 00:00',
      contentAr: 'يوميا: 07:00 - 00:00',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@riadice.ma',
      contentAr: 'contact@riadice.ma',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-elegant font-bold mb-4">
            Venez Nous <span className="text-accent">Découvrir</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Nous vous accueillons dans notre restaurant pour une expérience
            culinaire inoubliable
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h3 className="text-2xl font-elegant font-semibold mb-6 text-accent">
                Informations de Contact
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="bg-primary-foreground/10 border-primary-foreground/20 p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-start space-x-3">
                      <info.icon className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-sm text-accent mb-1">
                          {info.title}
                        </h4>
                        <p className="text-primary-foreground text-sm">
                          {info.content}
                        </p>
                        <p className="text-primary-foreground/70 text-xs font-moroccan">
                          {info.contentAr}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-elegant font-semibold mb-4 text-accent">
                Actions Rapides
              </h3>

              <div className="space-y-3">
                <Button className="btn-moroccan w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler pour Réserver
                </Button>

                <Button
                  variant="outline"
                  className="btn-outline-moroccan w-full justify-start"
                  onClick={() =>
                    window.open('https://www.instagram.com/riad.ice/', '_blank')
                  }
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  Suivre sur Instagram
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start text-primary-foreground hover:black"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Obtenir l'Itinéraire
                </Button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-elegant font-semibold mb-4 text-accent">
                Suivez-nous
              </h3>

              <div className="flex space-x-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  onClick={() =>
                    window.open('https://www.instagram.com/riad.ice/', '_blank')
                  }
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  onClick={() =>
                    window.open(
                      'https://web.facebook.com/riad.ice/?_rdc=1&_rdr#',
                      '_blank'
                    )
                  }
                >
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="animate-scale-in">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-6 h-full backdrop-blur-sm">
              <h3 className="text-xl font-elegant font-semibold mb-4 text-accent">
                Notre Emplacement
              </h3>

              {/* Map Placeholder */}
              <div className="bg-primary-foreground/5 rounded-xl h-auto lg:h-auto p-6 flex flex-col items-center justify-center space-y-4">
                <div className="text-center text-primary-foreground/70">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-accent" />
                  <p className="font-moroccan text-lg mb-2">
                    Carte Interactive
                  </p>
                  <p className="text-sm">Âïn-Harrouda</p>
                  <p className="text-sm">Casablanca, Maroc</p>
                </div>
                <div className="w-full max-w-3xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.338703050426!2d-7.44282392515495!3d33.62300467332156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cb5345033445%3A0xa5ae8d91ba33faf7!2sRiad%20Ice%20(Caf%C3%A9%26Restaurant)!5e1!3m2!1sen!2sma!4v1757362452225!5m2!1sen!2sma"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg shadow-md"
                  ></iframe>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/Riad+Ice+(Caf%C3%A9%26Restaurant)/@33.6230047,-7.4428239,626m/data=!3m2!1e3!4b1!4m6!3m5!1s0xda7cb5345033445:0xa5ae8d91ba33faf7!8m2!3d33.6230047!4d-7.440249!16s%2Fg%2F11sbp5nt39?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="btn-moroccan w-full mt-4">
                  Ouvrir dans Google Maps
                </Button>
              </a>
            </Card>
            {/* <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.338703050426!2d-7.44282392515495!3d33.62300467332156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cb5345033445%3A0xa5ae8d91ba33faf7!2sRiad%20Ice%20(Caf%C3%A9%26Restaurant)!5e1!3m2!1sen!2sma!4v1757362452225!5m2!1sen!2sma"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}
          </div>
        </div>

        {/* Opening Hours Highlight */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="inline-flex items-center bg-accent/20 rounded-full px-6 py-3 backdrop-blur-sm">
            <Clock className="h-5 w-5 text-accent mr-2" />
            <span className="text-primary-foreground font-medium">
              Ouvert maintenant • Ferme à 00:00
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
