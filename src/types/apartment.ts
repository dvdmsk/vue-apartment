export interface Apartment {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  geometry: GeoJSON.Point;
}
