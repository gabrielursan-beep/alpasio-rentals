export type Apartment = {
  slug: string;
  name: { ro: string; en: string };
  zone: { ro: string; en: string };
  address: { ro: string; en: string };
  excerpt: { ro: string; en: string };
  description: { ro: string; en: string };
  priceFrom: number;
  currency: string;
  sizeM2: number;
  rooms: number;
  bathrooms: number;
  beds: number;
  floor: string;
  maxGuests: number;
  features: string[];
  images: string[];
  highlights: { ro: string; en: string }[];
  mapLink: string;
};

export const apartments: Apartment[] = [
  {
    slug: 'm19',
    name: { ro: 'Apartament M19', en: 'Apartment M19' },
    zone: { ro: 'Faleză, Galați', en: 'Faleza, Galati' },
    address: { ro: 'Zona Faleză, etaj 2 cu lift, Galați', en: 'Faleza area, 2nd floor with elevator, Galati' },
    excerpt: {
      ro: '2 camere, 54m², etaj 2 cu lift, lângă Faleză și McDonalds. Balcon și loc de parcare.',
      en: '2 rooms, 54m², 2nd floor with elevator, near the Danube Faleza and McDonalds. Balcony and parking.',
    },
    description: {
      ro: 'Apartamentul cu 2 camere situat la etajul 2 în bloc cu lift este poziționat într-o zonă ușor accesibilă, aproape de mijloace de transport în comun și market Faleză. Facilități precum loc de parcare (nerezervat), balcon, spațiu amenajat pentru fumători, bucătărie complet utilată, internet și televiziune prin cablu. Ideal pentru delegații, familii sau șederi scurte cu confort de acasă.',
      en: 'A 2-room apartment on the 2nd floor with elevator, in an easily accessible area near public transport and the Faleza market. Facilities include parking (non-reserved), balcony, smoking area, fully equipped kitchen, high-speed WiFi and cable TV. Ideal for business trips, families or short stays with home comfort.',
    },
    priceFrom: 51,
    currency: '€',
    sizeM2: 54,
    rooms: 2,
    bathrooms: 1,
    beds: 2,
    floor: 'Etaj 2',
    maxGuests: 4,
    features: ['Wifi', 'HDTV Netflix', 'Aer condiționat', 'Centrală proprie', 'Bucătărie utilată', 'Cafea și ceai', 'Balcon', 'Loc parcare', 'Lift', 'Spațiu fumători'],
    images: [
      'https://alpasio.ro/wp-content/uploads/2023/02/351285619.jpg',
      'https://alpasio.ro/wp-content/uploads/2023/02/351286858.jpg',
      'https://alpasio.ro/wp-content/uploads/2023/02/351286563.jpg',
      'https://alpasio.ro/wp-content/uploads/2023/02/351286847.jpg',
      'https://alpasio.ro/wp-content/uploads/2023/02/351286562.jpg',
      'https://alpasio.ro/wp-content/uploads/2023/02/351286971.jpg',
    ],
    highlights: [
      { ro: 'La 2 pași de McDonalds', en: 'Two steps from McDonalds' },
      { ro: 'Lângă mijloace de transport', en: 'Near public transport' },
    ],
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Alpasio+M19+Galati+Faleza',
  },
  {
    slug: 'm2',
    name: { ro: 'Apartament M2', en: 'Apartment M2' },
    zone: { ro: 'Zona Tribunal, Galați', en: 'Tribunal area, Galati' },
    address: { ro: 'Zona Tribunalului, etaj 5 cu lift, 10 min de Faleză, Galați', en: 'Tribunal area, 5th floor with elevator, 10 min walk to Faleza, Galati' },
    excerpt: {
      ro: '2 camere, 54m², etaj 5 cu lift, la 10 minute de Faleză. Balcon, parcare, aproape de City Mall.',
      en: '2 rooms, 54m², 5th floor with elevator, 10 minutes from Faleza. Balcony, parking, near City Mall.',
    },
    description: {
      ro: 'Amplasat în zona Tribunalului, la 10 minute pe jos de Faleză, apartamentul cu 2 camere de la etajul 5 cu lift dispune de balcon, spațiu amenajat pentru fumători, bucătărie complet utilată, acces la internet și televiziune prin cablu. Perfect pentru cei care vor o masă la restaurant în centru sau shopping la City Mall.',
      en: 'Located in the Tribunal area, a 10-minute walk from Faleza, this 2-room apartment on the 5th floor with elevator features a balcony, smoking area, fully equipped kitchen, WiFi and cable TV. Perfect for central dining or shopping at City Mall.',
    },
    priceFrom: 51,
    currency: '€',
    sizeM2: 54,
    rooms: 2,
    bathrooms: 1,
    beds: 2,
    floor: 'Etaj 5',
    maxGuests: 4,
    features: ['Wifi', 'HDTV Netflix', 'Aer condiționat', 'Centrală proprie', 'Bucătărie utilată', 'Cafea și ceai', 'Balcon', 'Loc parcare', 'Lift', 'Spațiu fumători'],
    images: [
      'https://alpasio.ro/wp-content/uploads/2023/09/8-1600x860.jpeg',
      'https://alpasio.ro/wp-content/uploads/2023/09/6-1200x860.jpeg',
      'https://alpasio.ro/wp-content/uploads/2023/09/5-1200x860.jpeg',
      'https://alpasio.ro/wp-content/uploads/2023/09/4-1600x860.jpeg',
      'https://alpasio.ro/wp-content/uploads/2023/09/3-1600x860.jpeg',
      'https://alpasio.ro/wp-content/uploads/2023/09/2-1200x860.jpeg',
      'https://alpasio.ro/wp-content/uploads/2023/09/1-1600x860.jpeg',
    ],
    highlights: [
      { ro: 'Aproape de City Mall', en: 'Near City Mall' },
      { ro: '10 min de Faleza pe jos', en: '10 min walk to Faleza' },
    ],
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Alpasio+M2+Galati+Tribunal',
  },
];

export const siteInfo = {
  phone: '+40 743 684 327',
  phoneHref: 'tel:+40743684327',
  whatsapp: 'https://wa.me/40743684327?text=Buna%2C%20vreau%20disponibilitate%20la%20Alpasio%20Rentals%20pentru%20',
  email: 'office.alpasio@gmail.com',
  emailHref: 'mailto:office.alpasio@gmail.com',
  address: 'Galați, România',
  instagram: 'https://www.instagram.com/alpasiorentals',
  facebook: 'https://www.facebook.com/profile.php?id=100085458289670',
  checkIn: '14:00',
  checkOut: '12:00',
};
