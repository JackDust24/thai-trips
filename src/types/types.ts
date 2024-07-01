export type Trip = {
  id: string;
  name: string;
  priceInBaht: number;
  numberOfPlaces: number;
  tripDescPath: string;
  imagePath: string;
  description: string;
  dates: string;
  location: string;
  isAvailableForPurchase: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Location = {
  id: string;
  name: string;
  province: string;
  description: string;
  district: string;
  latCoords: string;
  lonCoords: boolean;
  createdAt: string;
  updatedAt: string;
};
