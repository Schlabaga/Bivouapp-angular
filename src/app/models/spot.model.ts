export interface Spot {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  distance: number;
  imageUrl: string;
  services: string[]; // pour tout ce qui est eau, wifi etc
  isFavorite: boolean;
  location: string;
  type: 'camping' | 'bivouac' | 'refuge' | 'point d\'eau';
}
