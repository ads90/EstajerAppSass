import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { Table } from 'primeng/table';
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
import { ShipmentService } from '../../services/shipment.service';
import { Shipment } from '../../domain/Shipment';

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
  selector: 'shipments-app',
  providers: [ShipmentService, MessageService, ConfirmationService],
  templateUrl: './shipments.component.html',
  styleUrl: './shipments.component.scss',
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
export class ShipmentsApp implements OnInit {
  shipmentDialog: boolean = false;

  shipments!: Shipment[];

  shipment!: Shipment;

  selectedShipments!: Shipment[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
      private shipmentService: ShipmentService,
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
      this.shipmentService.getShipments().then((data) => {
          this.shipments = data;
          this.cd.markForCheck();
      });

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.cols = [
          { field: 'code', header: 'Code', customExportHeader: 'Shipment Code' },
          { field: 'name', header: 'Name' },
          { field: 'image', header: 'Image' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  openNew() {
      this.shipment = {};
      this.submitted = false;
      this.shipmentDialog = true;
  }

  editShipment(shipment: Shipment) {
      this.shipment = { ...shipment };
      this.shipmentDialog = true;
  }

  deleteSelectedShipments() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected shipments?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.shipments = this.shipments.filter((val) => !this.selectedShipments?.includes(val));
              this.selectedShipments = null;
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Shipments Deleted',
                  life: 3000
              });
          }
      });
  }

  hideDialog() {
      this.shipmentDialog = false;
      this.submitted = false;
  }

  deleteShipment(shipment: Shipment) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + shipment.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.shipments = this.shipments.filter((val) => val.id !== shipment.id);
              this.shipment = {};
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Shipment Deleted',
                  life: 3000
              });
          }
      });
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.shipments.length; i++) {
          if (this.shipments[i].id === id) {
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

  saveShipment() {
      this.submitted = true;

      if (this.shipment.name?.trim()) {
          if (this.shipment.id) {
              this.shipments[this.findIndexById(this.shipment.id)] = this.shipment;
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Shipment Updated',
                  life: 3000
              });
          } else {
              this.shipment.id = this.createId();
              this.shipment.image = 'shipment-placeholder.svg';
              this.shipments.push(this.shipment);
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Shipment Created',
                  life: 3000
              });
          }

          this.shipments = [...this.shipments];
          this.shipmentDialog = false;
          this.shipment = {};
      }
  }
}
