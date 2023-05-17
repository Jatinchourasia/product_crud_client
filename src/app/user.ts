export interface User {
  _id: number;
  name: string;
  email: string;
  photo: {
    id: string;
    secure_url: string;
  };
}
export interface User2 {
  _id: number;
  name: string;
  email: string;
}
