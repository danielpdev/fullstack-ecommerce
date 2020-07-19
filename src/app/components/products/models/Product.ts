import { Brand } from './Brand';

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    brand: Brand;
    shipping: boolean;
    available: boolean;
    sold: number;
    publish: boolean;
    featured: boolean;
    availableQuantity: number;
    images: string[];
}
