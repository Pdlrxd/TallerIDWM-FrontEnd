export interface Product {
    id?:               number;
    title:            string;
    description?:      string;
    price:            number;
    stock?:            number;
    category?:         string;
    brand?:            string;
    condition?:        string;
    imageUrls:        string[];
    creationDate?:     Date;
    modificationDate?: Date | null;
}