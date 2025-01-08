export interface IOrder {
    id?: string;
    createdDate?: string;
    creatorName?: string;
    statusId?: number;
    receiverName?: string;
    firstReceiverNumber?: string;
    secondReceiverNumber?: string;
    receiverLocationId?: number;
    locationName?: string;
    latitude?: string;
    longitude?: string;
    storeId?: string;
    storeName?: string;
    itemsCount?: number;
    notes?: string;
    itemsCost?: number;
    deliveryCost?: number;
    policyNumber?: string;
    barcode?: string;
    imageId?: string;
    typeId?: number;
    parentOrderId?: string;
    deliveryDate?: string;
    image?: string;
}

export interface IOrderParameter {
    receiverName?: string;
    firstReceiverNumber?: string;
    secondReceiverNumber?: string;
    receiverLocationId?: number;
    storeId?: string;
    itemsCount?: number;
    notes?: string;
    itemsCost?: number;
    deliveryCost?: number;
    policyNumber?: string;
    barcode?: string;
    image?: string;
    typeId?: number;
    parentOrderId?: string;
    deliveryDate?: string;
    locationDetail?: string;
}

