export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: string;
  specs?: string[];
  features?: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  color: string;
  suitability: string;
}
