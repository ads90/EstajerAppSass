import { Filter } from "./filter";

export class DriverFilter implements Filter{
    pageSize: number = 0;
    pageIndex: number = 0;
    name?: string;
    phoneNumber?: string;
    username?: string;
    statusId?: number;
}