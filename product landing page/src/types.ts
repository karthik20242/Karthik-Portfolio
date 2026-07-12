export interface DronePart {
  id: string;
  name: string;
  description: string;
  xOffset: number;
  yOffset: number;
  zOffset: number;
  color: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  location: string;
  url: string;
  aspect: string;
}

export interface FlightMode {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface PerformanceStat {
  label: string;
  value: string;
  percentage: number;
  color: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
}
