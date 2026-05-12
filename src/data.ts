import { Product, Collection, Category, Testimonial, Material } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "luna-x",
    name: "Luna X Smart Toilet",
    category: "Smart Toilets",
    description: "Integrated bidet with intuitive technology and architectural silence.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Integrated bidet system",
      "Heated seat with 5 levels",
      "Touchless sensor flush",
      "Deodorizing system",
      "LED Night light",
      "Water-saving ceramic"
    ]
  },
  {
    id: "aurea-faucet",
    name: "Aurea Basin Mixer",
    category: "Faucets",
    description: "Minimalist geometry in brushed champagne gold finish.",
    image: "https://images.unsplash.com/photo-1620626011761-9963d7b8970a?q=80&w=2071&auto=format&fit=crop",
    features: ["Brushed gold finish", "Precision ceramic cartridge", "Water-saving aerator"]
  },
  {
    id: "terra-basin",
    name: "Terra Stone Basin",
    category: "Wash Basins",
    description: "Hand-finished natural stone basin for organic modern vanities.",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop",
    features: ["Natural stone", "Unique texture", "Hygienic surface"]
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: "smart-series",
    title: "Smart Toilet Series",
    description: "Intuitive technology meets architectural silence and hygiene.",
    image: "https://images.unsplash.com/photo-1620626011761-9963d7b8970a?q=80&w=2071&auto=format&fit=crop",
    tags: ["Touchless", "Heated", "Water Saving"]
  },
  {
    id: "minimal-basin",
    title: "Minimal Basin & Faucet",
    description: "Clean geometry for modern vanities and refined daily rituals.",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2070&auto=format&fit=crop",
    tags: ["Ceramic", "Gold Accent", "Minimal"]
  },
  {
    id: "rain-shower",
    title: "Rain Shower System",
    description: "Spa-like water flow designed for calm and presence.",
    image: "https://images.unsplash.com/photo-1620625514770-4239bc7a6fac?q=80&w=2073&auto=format&fit=crop",
    tags: ["Rainfall", "Concealed", "Matte Black"]
  },
  {
    id: "freestanding-bath",
    title: "Freestanding Bathtub",
    description: "Sculptural forms that transform bathrooms into personal spas.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop",
    tags: ["Acyrlic", "Ergonomic", "Statement"]
  },
  {
    id: "led-vanity",
    title: "LED Mirror & Vanity",
    description: "Functional beauty with refined storage and soft lighting.",
    image: "https://images.unsplash.com/photo-1521783593447-5702b5bfd744?q=80&w=2070&auto=format&fit=crop",
    tags: ["LED", "Smart Storage", "Anti-Fog"]
  }
];

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Smart Toilets",
    description: "Comfort, hygiene, and intelligent water control.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat-2",
    name: "Wash Basins",
    description: "Countertop, wall-mounted, and stone-inspired designs.",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat-3",
    name: "Faucets",
    description: "Chrome, matte black, and champagne gold finishes.",
    image: "https://images.unsplash.com/photo-1620626011761-9963d7b8970a?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "cat-4",
    name: "Shower Systems",
    description: "Rain showers, concealed mixers, and handheld sets.",
    image: "https://images.unsplash.com/photo-1549420603-513689f257a3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat-5",
    name: "Bathtubs",
    description: "Freestanding forms for spa-like relaxation.",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "cat-6",
    name: "Vanities & Mirrors",
    description: "Storage, lighting, and daily convenience.",
    image: "https://images.unsplash.com/photo-1521783593447-5702b5bfd744?q=80&w=2070&auto=format&fit=crop"
  }
];

export const MATERIALS: Material[] = [
  {
    id: "gold",
    name: "Champagne Gold",
    description: "Warm, reflective, and opulent. Perfect for premium accents.",
    color: "#D8C08A",
    suitability: "Faucets, Showers, Accessories"
  },
  {
    id: "black",
    name: "Matte Black",
    description: "Strictly minimal and contemporary with strong architectural presence.",
    color: "#1A1A1A",
    suitability: "Minimalist Bathrooms, Industrial lofts"
  },
  {
    id: "chrome",
    name: "Polished Chrome",
    description: "Timeless brilliance that reflects light and maintains hygiene.",
    color: "#E5E5E5",
    suitability: "Showrooms, Hotels, Classic villas"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Mia Tran",
    role: "Villa Homeowner",
    quote: "The team helped us match every detail, from the smart toilet to the shower system. The final bathroom feels calm, premium, and practical."
  },
  {
    id: "t2",
    name: "Daniel Nguyen",
    role: "Interior Designer",
    quote: "The product curation is refined. It saves time when selecting sanitaryware for high-end residential projects."
  },
  {
    id: "t3",
    name: "Linh Pham",
    role: "Apartment Owner",
    quote: "They helped me choose compact products that still feel luxurious in a small bathroom."
  }
];
