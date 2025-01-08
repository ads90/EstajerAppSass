export interface PagedList<T> {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    list: T[];
}