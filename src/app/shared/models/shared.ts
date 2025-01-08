export interface IMapLocations {
    id?: string;
    latitude?: number;
    longitude?: number;
    colorIcon?: any;
    locationName?: string;
}

export interface ISimpleUser {
    id?: string;
    name?: string;
}

export interface ISimpleStore {
    id?: string;
    name?: number;
}

export interface ISimpleCar {
    id?: string;
    name?: string;
}

export interface ISimpleCity {
    id?: number;
    name?: string;
}

export interface ISimpleLocation {
    id?: number;
    name?: string;
    deliveryPrice?: number;
    cityId?: number;
    cityName?: string;
    latitude?: string;
    longitude?: string;
    icon?: any;
}

export interface ISimpleReceiverDetail {
    receiverName?: string;
    firstReceiverNumber?: string;
    secondReceiverNumber?: string;
}

export interface ISimpleThingsDetail{
    itemsCost?: number;
    itemsCount?: number;
    deliveryCost?: number;
    notes?: string;
}

export interface IKeyValue {
    id?: number,
    name: string
}

export interface IStringKeyValue {
    id?: string,
    name: string
}

export interface ISimpleDriver {
    id?: string,
    name?: string,
    deliveryFees?: number
}