export interface ListingType {
  tour_id: string;
  tour_name: string;
  image: string | null;
  description: string;
  duration: string;
  location: string | null;
  price: number;
  average_rating: number;
}
