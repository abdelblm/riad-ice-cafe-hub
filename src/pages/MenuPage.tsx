import React, { useState } from 'react';
import { Star, Clock, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import couscousImage from '@/assets/couscous-hero.jpg';
import pastillaImage from '@/assets/pastilla-hero.jpg';
import milkshakeImage from '@/assets/milkshake-hero.jpg';
import dejeunerImage from '@/assets/dejeuner.webp';
import dCroissantBeurre from '@/assets/CroissantBeurre.jpg';
import fineHerbsOmelet from '@/assets/fine-herbs-omelet.jpg';
import tajine from '@/assets/Tajine.webp';
import TajinedAgneau from '@/assets/TajinedAgneau.jpg';
import tajinedelegumes from '@/assets/tajine-de-legumes.jpeg';

import rfissaMarocaine from '@/assets/rfissa-marocaine.webp';

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('breakfast');
  const [language, setLanguage] = useState('fr');

  const categories = [
    { id: 'breakfast', name: { fr: 'Petit Déjeuner', ar: 'الفطور' } },
    { id: 'tajines', name: { fr: 'Tajines', ar: 'الطواجن' } },
    { id: 'daily-specials', name: { fr: 'Spécialités', ar: 'الأطباق الخاصة' } },
    { id: 'drinks', name: { fr: 'Boissons', ar: 'المشروبات' } },
    { id: 'iceCreams', name: { fr: 'Glaces', ar: 'المثلجات' } },
  ];

  const menuItems = {
    breakfast: [
      {
        name: { fr: 'Petit Déjeuner Marocain', ar: 'فطور مغربي' },
        description: {
          fr: 'Msemen, miel, confiture, beurre, thé à la menthe',
          ar: 'مسمن، عسل، مربى، زبدة، أتاي بالنعناع',
        },
        price: '35 MAD',
        image: dejeunerImage,
        category: 'Tradition',
        rating: 4.7,
        time: '15 min',
        isSpecial: false,
      },
      {
        name: { fr: 'Omelette aux Fines Herbes', ar: 'عجة بالأعشاب' },
        description: {
          fr: 'Omelette fraîche avec persil, coriandre et tomates',
          ar: 'عجة طازجة بالمعدنوس والقزبر والطماطم',
        },
        price: '25 MAD',
        image: fineHerbsOmelet,
        category: 'Moderne',
        rating: 4.5,
        time: '10 min',
        isSpecial: false,
      },
      {
        name: { fr: 'Croissant au Beurre', ar: 'كرواسان بالزبدة' },
        description: {
          fr: 'Croissant français classique avec confiture',
          ar: 'كرواسان فرنسي كلاسيكي بالمربى',
        },
        price: '15 MAD',
        image: dCroissantBeurre,
        category: 'Pâtisserie',
        rating: 4.6,
        time: '5 min',
        isSpecial: false,
      },
    ],
    tajines: [
      {
        name: {
          fr: 'Tajine de Poulet aux Olives',
          ar: 'طاجين الدجاج بالزيتون',
        },
        description: {
          fr: 'Poulet mijoté avec olives vertes et citrons confits',
          ar: 'دجاج مطبوخ بالزيتون الأخضر والحامض المملح',
        },
        price: '65 MAD',
        image: tajine,
        popular: true,
        category: 'Tradition',
        rating: 4.8,
        time: '30 min',
        isSpecial: false,
      },
      {
        name: {
          fr: "Tajine d'Agneau aux Pruneaux",
          ar: 'طاجين الخروف بالبرقوق',
        },
        description: {
          fr: 'Agneau tendre avec pruneaux et amandes grillées',
          ar: 'لحم الخروف الطري بالبرقوق واللوز المحمص',
        },
        price: '85 MAD',
        image: TajinedAgneau,
        category: 'Tradition',
        rating: 4.9,
        time: '35 min',
        isSpecial: false,
      },
      {
        name: { fr: 'Tajine de Légumes', ar: 'طاجين الخضار' },
        description: {
          fr: 'Mélange de légumes de saison aux épices marocaines',
          ar: 'خليط من الخضار الموسمية بالتوابل المغربية',
        },
        price: '45 MAD',
        image: tajinedelegumes,
        category: 'Végétarien',
        rating: 4.6,
        time: '25 min',
        isSpecial: false,
      },
    ],
    'daily-specials': [
      {
        name: { fr: 'Couscous Royal (Vendredi)', ar: 'كسكس ملكي (الجمعة)' },
        description: {
          fr: 'Couscous avec 7 légumes, agneau, poulet et merguez',
          ar: 'كسكس بسبع خضار، خروف، دجاج ومرقاز',
        },
        price: '85 MAD',
        image: couscousImage,
        special: 'Vendredi',
        popular: true,
        category: 'Tradition',
        rating: 4.9,
        time: '25 min',
        isSpecial: true,
      },
      {
        name: {
          fr: 'Rfissa Traditionnelle (Mercredi)',
          ar: 'رفيسة تقليدية (الأربعاء)',
        },
        description: {
          fr: 'Poulet aux msemen et fenugrec',
          ar: 'دجاج بالمسمن والحلبة',
        },
        price: '75 MAD',
        image: rfissaMarocaine,
        special: 'Mercredi',
        category: 'Tradition',
        rating: 4.8,
        time: '30 min',
        isSpecial: true,
      },
      {
        name: { fr: 'Pastilla au Poulet', ar: 'بسطيلة بالدجاج' },
        description: {
          fr: 'Feuilleté sucré-salé aux amandes et cannelle',
          ar: 'ورقة حلوة مالحة باللوز والقرفة',
        },
        price: '45 MAD',
        image: pastillaImage,
        category: 'Tradition',
        rating: 4.8,
        time: '20 min',
        isSpecial: false,
      },
    ],
    drinks: [
      {
        name: { fr: 'Milkshake Signature', ar: 'ميلك شيك مميز' },
        description: {
          fr: 'Milkshake crémeux aux fruits frais et chantilly artisanale',
          ar: 'ميلك شيك كريمي مع فواكه طازجة وكريمة مخفوقة محلية الصنع',
        },
        price: '35 MAD',
        image: milkshakeImage,
        category: 'Moderne',
        rating: 4.7,
        time: '5 min',
        isSpecial: false,
      },
      {
        name: { fr: 'Milkshake Avocat', ar: 'ميلك شيك أفوكادو' },
        description: {
          fr: 'Avocat frais, lait, miel et glace vanille',
          ar: 'أفوكادو طازج، حليب، عسل وآيس كريم فانيليا',
        },
        price: '25 MAD',
        image:
          'https://images.pexels.com/photos/1346347/pexels-photo-1346347.jpeg?auto=compress&cs=tinysrgb&w=400',
        popular: true,
        category: 'Moderne',
        rating: 4.7,
        time: '5 min',
        isSpecial: false,
      },
      {
        name: { fr: "Jus d'Orange Frais", ar: 'عصير البرتقال الطازج' },
        description: {
          fr: 'Orange pressée fraîche du jour',
          ar: 'برتقال معصور طازج من اليوم',
        },
        price: '18 MAD',
        image:
          'https://images.pexels.com/photos/158053/fresh-orange-juice-squeezed-refreshing-citrus-158053.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Boisson',
        rating: 4.6,
        time: '3 min',
        isSpecial: false,
      },
      {
        name: { fr: 'Thé à la Menthe', ar: 'أتاي بالنعناع' },
        description: {
          fr: 'Thé vert traditionnel à la menthe fraîche',
          ar: 'شاي أخضر تقليدي بالنعناع الطازج',
        },
        price: '12 MAD',
        image:
          'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Tradition',
        rating: 4.8,
        time: '7 min',
        isSpecial: false,
      },
      {
        name: { fr: 'Café Espresso', ar: 'قهوة إسبريسو' },
        description: {
          fr: 'Café italien authentique, grains torréfiés',
          ar: 'قهوة إيطالية أصلية، حبوب محمصة',
        },
        price: '15 MAD',
        image:
          'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
        category: 'Boisson',
        rating: 4.5,
        time: '2 min',
        isSpecial: false,
      },
    ],
   iceCreams: [
  {
    name: { fr: 'Glace à la pistache', ar: 'مثلجات الفستق' },
    description: {
      fr: 'Crème glacée onctueuse à la pistache grillée',
      ar: 'مثلجات كريمية بالفستق المحمص',
    },
    price: '15 MAD',
    image:
      'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Gourmet',
    rating: 4.9,
    time: '3 min',
    isSpecial: true,
  },
  {
    name: { fr: 'Glace au lait d’amande', ar: 'مثلجات بحليب اللوز' },
    description: {
      fr: 'Délice végétal au lait d’amande et éclats de dattes',
      ar: 'مثلجات نباتية بحليب اللوز وقطع التمر',
    },
    price: '14 MAD',
    image:
      'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tradition',
    rating: 4.7,
    time: '3 min',
    isSpecial: false,
  },
  {
    name: { fr: 'Sorbet à la menthe', ar: 'سوربيه النعناع' },
    description: {
      fr: 'Sorbet rafraîchissant à la menthe marocaine',
      ar: 'سوربيه منعش بنكهة النعناع المغربي',
    },
    price: '10 MAD',
    image:
      'https://sharkninja-cookingcircle.s3.eu-west-1.amazonaws.com/wp-content/uploads/2021/09/24124327/Mint-Chocolate-Sorbet.jpg',
    category: 'Sorbet',
    rating: 4.5,
    time: '2 min',
    isSpecial: false,
  },
],

  };

  return (
    <div id="menu" className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-4xl md:text-5xl font-elegant font-bold text-primary mb-4">
          Nos <span className="text-gradient-moroccan">Spécialités</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Saveurs authentiques du Maroc
        </p>
        {/* Language Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="bg-gray-900 rounded-full p-1 flex">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                language === 'fr'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Français
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                language === 'ar'
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {category.name[language]}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems[selectedCategory]?.map((item, index) => (
              <Card
                key={index}
                className="card-moroccan group cursor-pointer overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.isSpecial && (
                    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Spécial {item.special}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-primary/80 text-primary-foreground px-2 py-1 rounded-full text-sm">
                    {item.category}
                  </div>
                  {item.popular && (
                    <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Star size={14} className="mr-1" />
                      Populaire
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-elegant font-semibold text-primary">
                      {item.name[language]}
                    </h3>
                    <span className="text-2xl font-bold text-accent">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-1 font-moroccan">
                    {item.name.ar}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {item.description[language]}
                  </p>

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
                    <Button size="sm" variant="ghost" className="group">
                      <Utensils className="h-4 w-4 mr-1 group-hover:rotate-12 transition-transform duration-300" />
                      Commander
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Specials Info */}

      <div className="bg-primary text-primary-foreground rounded-2xl p-8 animate-fade-in">
        <h3 className="text-2xl font-elegant font-bold text-center mb-8">
          Spécialités <span className="text-accent">Hebdomadaires</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {menuItems['daily-specials'].map((special, index) => (
            <div
              key={index}
              className="text-center p-4 bg-primary-foreground/10 rounded-xl backdrop-blur-sm"
            >
              <h4 className="font-bold text-accent mb-2">{special.special}</h4>
              <p className="text-lg font-moroccan mb-1">
                {special.name[language]}
              </p>
              <p className="text-2xl font-bold">{special.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
