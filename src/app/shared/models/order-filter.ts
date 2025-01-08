export interface IOrderFilter {
    storeId?: string;
    statusId?: Array<number>;
    typeId?: number;
    policyNumber?: string;
    fromCreatedDate?: Date;
    toCreatedDate?: Date;
    locationId?: number;
    tripId?: string;
}