
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
    event?:event[];
}

export interface event {
  id?:string;
  resourceId?:string;
  title?:string;
  start?:string;
  end?:string;
}
