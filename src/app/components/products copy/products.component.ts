import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { Table } from 'primeng/table';
import { ProductService } from '../../services/product.service';
import { Product } from '../../domain/product';
import { CommonModule } from '@angular/common';import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
      InputNumberModule
    ]
})
export class ProductsApp implements OnInit {
  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
      private productService: ProductService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private cd: ChangeDetectorRef
  ) {}
    ngOnInit(): void {
        this.loadDemoData();
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
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.cols = [
          { field: 'code', header: 'Code', customExportHeader: 'Product Code' },
          { field: 'name', header: 'Name' },
          { field: 'image', header: 'Image' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
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
              this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
              this.selectedProducts = null;
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Products Deleted',
                  life: 3000
              });
          }
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
                  life: 3000
              });
          }
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
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  getSeverity(status: string) : 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
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
                  life: 3000
              });
          } else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Product Created',
                  life: 3000
              });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }
}
