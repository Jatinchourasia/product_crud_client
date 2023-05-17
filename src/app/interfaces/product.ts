export interface Product {
  _id: number;
  name: string;
  price: number;
  description: string;
  photo: {
    id: string;
    secure_url: string;
  };
  category: string;
  stock: number;
}
