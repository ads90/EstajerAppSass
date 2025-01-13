import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { Table } from 'primeng/table';
import { ProductService } from '../../services/product.service';
import { event, Product } from '../../domain/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PopoverModule } from 'primeng/popover';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DrawerModule } from 'primeng/drawer';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { RadioButton } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { DateClickArg } from '@fullcalendar/interaction/index.js';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { Renderer2 } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'products-app',
  providers: [ProductService, MessageService, ConfirmationService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [
    CommonModule,
    RouterModule,
    DropdownModule,
    ChartModule,
    InputSwitchModule,
    FormsModule,
    DividerModule,
    AvatarModule,
    TooltipModule,
    IconField,
    InputIcon,
    ButtonModule,
    TableModule,
    InputTextModule,
    Tag,
    ToolbarModule,
    OverlayBadgeModule,
    DrawerModule,
    ToggleSwitchModule,
    PopoverModule,
    FileUploadModule,
    RatingModule,
    TagModule,
    Dialog,
    SelectModule,
    ConfirmDialogModule,
    RadioButton,
    InputNumberModule,
    FullCalendarModule,
     TranslateModule,

  ],
})
export class ProductsApp implements OnInit, AfterContentInit {
  handleDateClick(arg: DateClickArg): void {
    throw new Error('Method not implemented.');
  }
  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];
  calendarOptions: CalendarOptions = {};

  exportColumns!: ExportColumn[];
  currentTemplate!: TemplateRef<any>;
  selectedEvent: any = null;

  @ViewChild('Table', { static: true }) Table!: TemplateRef<any>;
  @ViewChild('caleander', { static: true }) caleander!: TemplateRef<any>;
  isPaginatorEnabled:boolean=true;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  resourceData: Product[] = [{}];
  events2:event[]=[];
  events = [
    {
      resourceId: '1000',  // Product ID
      title: 'CHECK-OUT-1000: Bamboo Watch - Abdullah Tahan',
      start: '2025-01-08T21:30:00',
      end: '2025-01-09T03:15:00',
    },
    {
      resourceId: '1001',  // Product ID
      title: 'RESERVATION-1001: Black Watch - Abdullah Tahan',
      start: '2025-01-16T00:30:00',
      end: '2025-01-23T01:30:00',
    },
    {
      resourceId: '1002',  // Product ID
      title: 'RESERVATION-1002: Blue Band - Mohamed Ibrahem',
      start: '2025-02-16T00:30:00',
      end: '2025-03-23T01:30:00',
    },
    {
      resourceId: '1003',  // Product ID
      title: 'RESERVATION-1003: Blue T-Shirt - Samir',
      start: '2025-01-01T00:30:00',
      end: '2025-01-05T01:30:00',
    },
    {
      resourceId: '1004',  // Product ID
      title: 'RESERVATION-1004: Bracelet - Mohamed Ali',
      start: '2025-01-10T12:00:00',
      end: '2025-01-12T12:00:00',
    },
    // Adding more product-based events...
    {
      resourceId: '1000',
      title: 'CHECK-OUT-1005: Brown Purse - Lina',
      start: '2025-01-20T08:30:00',
      end: '2025-01-21T14:30:00',
    },
    {
      resourceId: '1006',
      title: 'RESERVATION-1006: Chakra Bracelet - John Doe',
      start: '2025-02-01T10:00:00',
      end: '2025-02-02T16:00:00',
    },
    {
      resourceId: '1007',
      title: 'CHECK-OUT-1007: Galaxy Earrings - Sarah',
      start: '2025-03-05T13:00:00',
      end: '2025-03-06T18:00:00',
    },
    // Continue with all your products and respective events
  ];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private router:Router,
    private renderer: Renderer2
  ) {}

  ngAfterContentInit(): void {
    this.currentTemplate = this.Table;
  }
  ngOnInit(): void {
    this.loadDemoData();
     this.getevents();

    this.calendarOptions = {
      initialView: 'resourceTimelineDay',
      plugins: [
        resourceTimelinePlugin,
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
      ],
      events: this.events2,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
      },
      eventClick: (info) => {
        const resourceId = info.event._def.resourceIds![0];
         this.router.navigate(["/productDetails", resourceId]); // Navigate to the product detail page
      },
            resources: this.productService.getProductsData().map((product) => ({
        id: product.id,
        title: product.name,
        image: product.image,
      })),
      resourceLabelContent: (arg) => {
        const resource = arg.resource; // Each resource object
        const resourceId = resource.id;
        const itemdetails = this.getitembyid(resourceId);
        const resourceName = itemdetails.name;
        const resourceImage = itemdetails.image;
        const resourceStatue=itemdetails.inventoryStatus;
        const container = document.createElement('div');
        container.innerHTML = `
              <div class="Resource-Section">
  <div class="image"><img src="${resourceImage}" alt="image"></div>
  <div class="details">
<div class="name">${resourceName}</div>
<div class="statue">${resourceStatue}</div>
  </div>
</div>
            `;
            const nameElement = container.querySelector('.name');
            if (nameElement) {
              this.renderer.listen(nameElement, 'click', () => {
                this.openproductdetais(resourceId);  // Call the function when clicked
              });
            }

        return { domNodes: [container] };
      },
    };
  }

  onEventClick(info: any): void {
    this.selectedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start.toISOString(),
      end: info.event.end?.toISOString(),
    };
  }
  setTemplate(template: TemplateRef<any>) {
    this.currentTemplate = template;
    if (template === this.Table) {
      this.isPaginatorEnabled = true;
      this.dt.reset();
    } else {
      this.isPaginatorEnabled = false;
    }
  }
    getitembyid(id: string) {
    let Item: Product = {};
    this.productService.getProductsData().find((item) => {
      if (item.id === id) {
        Item = item;
      }
    });
    return Item;
  }

  getevents()
  {
    this.events2 = this.productService.getProductsData()
    .map(product => product.event || [])  // Ensure empty array if events is undefined
    .flat();  // Flattens the array to get a single array of events
  }
openproductdetais(id:any)
{
  this.router.navigate(["/productDetails", id]);
}

  exportCSV() {
    this.dt.exportCSV();
  }

  loadDemoData() {
    this.productService.getProducts().then((data) => {
      this.products = data;
      this.cd.markForCheck();
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];

    this.cols = [
      { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
      { field: 'name', header: 'Name' },
      { field: 'image', header: 'Image' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(
    status: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warn'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return 'secondary';
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }
}
