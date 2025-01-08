import { IOrderFilter } from "./order-filter";

export interface IOrderClustring {
    drivers?: Array<string>;
    orderFilterParameter?: IOrderFilter; 
    isAllSelected?: boolean;
    selectedOrders?: Array<string>;
    unselectedOrders?: Array<string>;
}
