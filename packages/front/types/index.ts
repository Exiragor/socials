export * from './state';

export interface User {
  id: number;
  username: string;
  email: string;
  birthdate: string;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface Address {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
}

export interface Chat {
  id: number;
  name: string;
  picture: string;
  description: string;
}

export interface Link {
    path: string;
    text: string;
    show: boolean;
}