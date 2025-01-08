import { NgxSpinnerService } from "ngx-spinner";
import { HttpService } from "../services/http.service";
import { Filter } from "./filter";
import { PagedList } from "./paged-list";
import { TableLazyLoadEvent } from "primeng/table";
import { inject } from "@angular/core";
import { TimezoneService } from "../services/timezone.service";

export abstract class PaginationComponent<T> {
    clientTimeZone: string = '3';
    constructor(protected spinner: NgxSpinnerService) { 
        const service = inject(TimezoneService); 
        this.clientTimeZone = service.getTimezoneOffset();
    }
    isTableLoading: boolean = false;
    globalFilterFields = [];
    dataList: PagedList<T> = { list: [], pageIndex: 0, pageSize: 5, totalCount: 0, totalPages: 0 };
    isSelectAll: boolean = true;
    selectedList: Array<string> = [];
    unselectedList: Array<string> = [];


    onSelectionChange(value = []) {
        this.isSelectAll = value.length === this.dataList.totalCount;
        this.selectedList = value;
    }

    loadData(func: (filter: Filter, pageIndex: number, pageSize: number, http: HttpService) => Promise<PagedList<T>>,
        filter: Filter, event: TableLazyLoadEvent, http: HttpService) {
        const currentPage = (event.first ?? 1) / (event.rows ?? 1);
        this.spinner.show();
        func(filter, currentPage, event.rows ?? 1, http).then(res => {
            this.dataList = res;
            this.spinner.hide();
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              }, 0);
        }).catch(err => {
            console.log(err);
            this.spinner.hide();
        }).then(res => {
            this.spinner.hide();
        })
    }

    loadDataById(func: (id: string, filter: Filter, pageIndex: number, pageSize: number, http: HttpService) => Promise<PagedList<T>>,
    id: string, filter: Filter, event: TableLazyLoadEvent, http: HttpService) {
    const currentPage = (event.first ?? 1) / (event.rows ?? 1);
    this.spinner.show();
    func(id, filter, currentPage, event.rows ?? 1, http).then(res => {
        this.dataList = res;
        this.spinner.hide();
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }, 0);
    }).catch(err => {
        console.log(err);
        this.spinner.hide();
    }).then(res => {
        this.spinner.hide();
    })
}

    onSelectAllChange(event: any) {
        const checked = event.checked;
        this.unselectedList = [];
        this.selectedList = [];
        if (checked) {
            this.isSelectAll = true;
        }
        else {
            this.isSelectAll = false;
        }
    }

    private handleUnselected(item: any, key: string = 'id') {
        const isUnselected = this.unselectedList.find(x => x === item[key]);
        if (isUnselected) {
            this.unselectedList = this.unselectedList.filter(x => x !== item[key]);
        } else {
            this.unselectedList.push(item[key]);
            if (this.unselectedList.length === this.dataList.totalCount) {
                this.isSelectAll = false;
                this.selectedList = [];
            }
        }
    }

    private handleSelected(item: any, key: string = 'id') {
        const isSelected = this.selectedList.find(x => x === item[key]);
        if (isSelected) {
            this.selectedList = this.selectedList.filter(x => x !== item[key]);
        } else {
            this.selectedList.push(item[key]);
            if (this.selectedList.length === this.dataList.totalCount) {
                this.isSelectAll = true;
                this.unselectedList = [];
            }
        }
    }
    addOrRemoveSelection(item: any, key: string = 'id') {
        if (this.isSelectAll) {
            this.handleUnselected(item, key);
        } else {
            this.handleSelected(item, key);
        }
    }

    isSelected(item: any, key: string = 'id'): boolean {
        if (this.isSelectAll && !this.unselectedList.find(x => x === item[key])) {
            return true;
        }
        const isSelected = this.selectedList.find(x => x === item[key]);
        if (isSelected) {
            return true;
        }
        return false;
    }

    public get isAllSelected(): boolean {
        return this.isSelectAll && this.unselectedList.length === 0;
    }

    public get getTimezone() {
        const service = inject(TimezoneService);
        console.log(`zone is ${service.getClientTimezone()} and offset is ${service.getTimezoneOffset()}`);
        return service.getClientTimezone();
    }
}