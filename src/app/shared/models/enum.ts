export enum ActionsType { 
    Add = 'add',
    Edit = 'edit',
    View = 'view',
}

export enum StorageLanguage {
    Arabic = 0,
    English = 1,
}

export enum Status {
    Deleted = 0,
    Active = 1
}

export enum StoreStatus {
    Deleted = 0,
    Active = 1,
    Pinding = 2,
    Blocked = 3
}

export enum UserStatus {
    Deleted = 0,
    Active = 1,
    Pinding = 2,
    Blocked = 3
}

export enum OrderStatus {
    Canceled = 0,
    New = 1,
    OutToDelivery = 2,
    Delivered = 3,
    CustomerCancelled = 4,
    ClientCancelled = 5,
    CustomerPostponed = 6,
    ClientPostponed = 7,
    ArrivedRejectPayForThings = 8,
    ArrivedRejectPayForDeliveryAndThings = 9,
    ArraivedNoAnswer = 10,
    PostponedCancelled = 11,
    PostponedNoAnswer = 12
}

export enum OrderType {
    Delivery = 1,
    Pickup = 2,
    Return = 3
}

export enum OrderBound {
    Not = 0,
    In = 1
}

export enum TripStatus {
    New = 1,
    InProcessing = 2,
    Completed = 3
}

export enum UserRole {
    SuperAdmin = 1,
    AccountantUser = 2,
    Driver = 3,
    StoreAdmin = 4
}

export enum Mode {
    Add = 'ADD',
    Update = 'UPDATE',
    View = 'VIEW'
}

export enum ServerEndPoint {
    Login = 'Identities/login',
    GetAccountByCode = 'accounts',
    Refresh = 'Identities/refreshtoken',
    Permission = 'Identities/permissions',
    Users = 'Users',
    UsersFilter = 'Users/filter',
    Employees = 'Users',
    EmployeesFilter = 'Users/filter',
    Stores = 'Stores',
    StoresFilter = 'Stores/filter',
    IsNewStoreCode = 'Stores/is-new-storecode',
    Cities = "Cities",
    Locations = "Locations",
    LocationsFilter = "Locations/filter",
    LocationsDropDown = "Locations/lookup",
    Cars = "Cars",
    Drivers = "Drivers",
    DriversFilter = "Drivers/filter",
    LocationDrivers = "Drivers/Locations",
    Orders = "Orders",
    OrdersFilter = "Orders/filter",
    TripAvailableOrdersFilter = "Orders/trips/{0}/filter",
    PendingOrdersFilter = "Orders/pending/filter",
    Test = "Test",
    StatusStatistics = "Dashboards/orders/status-statistics",
    OrderClustring = "trips/cluster",
    TripsSorting = "trips/{0}/sorting",
    TripsOrder = "trips/{0}/orders", 
    TripsOrderMovment = "trips/movment", 
    TripsStartFinished = "trips/start-finished",
    DeleteTripsOrder = "trips/{0}/orders/{1}",
    TripOrdersRouting = "trips/{0}/routing",
    Merchants = "merchants",
    MerchantsFilter = "merchants/filter",
    MerchantsDropDown = "merchants/lookup",
    OrderStatus = "order-status",
    OrderStatusDropDown = "order-status/lookup",
    OrderComments = "orders-comments",
    OrderCommentFilter = "orders-comments/filter",
    OrderScan = "orders/scan",
    Trips = "trips",
    TripsFilter = "trips/filter",
    AddTripOrders = "trips/{0}/orders",
    GetOrdersByTrip = "orders/trips",
}