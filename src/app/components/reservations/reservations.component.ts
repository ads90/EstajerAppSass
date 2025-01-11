import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { Table } from 'primeng/table';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../domain/reservation';
import { CommonModule } from '@angular/common';import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
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
  selector: 'reservations-app',
  providers: [ReservationService, MessageService, ConfirmationService],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
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
      ToolbarModule,
      OverlayBadgeModule,
      DrawerModule,
      ToggleSwitchModule,
      PopoverModule,
      FileUploadModule,
      RatingModule,
      SelectModule,
      ConfirmDialogModule,
      InputNumberModule
    ]
})
export class ReservationsApp implements OnInit {
  reservationDialog: boolean = false;

  reservations!: Reservation[];

  reservation!: Reservation;

  selectedReservations!: Reservation[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
      private reservationService: ReservationService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private cd: ChangeDetectorRef,
      private router: Router
  ) {}
    ngOnInit(): void {
        this.loadDemoData();
    }


  exportCSV() {
      this.dt.exportCSV();
  }

  loadDemoData() {
      this.reservationService.getReservations().then((data) => {
          this.reservations = data;
          this.cd.markForCheck();
      });

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.cols = [
          { field: 'code', header: 'Code', customExportHeader: 'Reservation Code' },
          { field: 'name', header: 'Name' },
          { field: 'image', header: 'Image' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  openNew() {
      this.reservation = {};
      this.submitted = false;
      this.reservationDialog = true;
  }

  editReservation(reservation: Reservation) {
      this.reservation = { ...reservation };
      this.reservationDialog = true;
  }

  deleteSelectedReservations() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected reservations?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.reservations = this.reservations.filter((val) => !this.selectedReservations?.includes(val));
              this.selectedReservations = null;
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Reservations Deleted',
                  life: 3000
              });
          }
      });
  }

  hideDialog() {
      this.reservationDialog = false;
      this.submitted = false;
  }

  deleteReservation(reservation: Reservation) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + reservation.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.reservations = this.reservations.filter((val) => val.id !== reservation.id);
              this.reservation = {};
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Reservation Deleted',
                  life: 3000
              });
          }
      });
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.reservations.length; i++) {
          if (this.reservations[i].id === id) {
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

  saveReservation() {
      // this.submitted = true;
      //
      // if (this.reservation.name?.trim()) {
      //     if (this.reservation.id) {
      //         this.reservations[this.findIndexById(this.reservation.id)] = this.reservation;
      //         this.messageService.add({
      //             severity: 'success',
      //             summary: 'Successful',
      //             detail: 'Reservation Updated',
      //             life: 3000
      //         });
      //     } else {
      //         this.reservation.id = this.createId();
      //         this.reservation.image = 'reservation-placeholder.svg';
      //         this.reservations.push(this.reservation);
      //         this.messageService.add({
      //             severity: 'success',
      //             summary: 'Successful',
      //             detail: 'Reservation Created',
      //             life: 3000
      //         });
      //     }
      //
      //     this.reservations = [...this.reservations];
      //     this.reservationDialog = false;
      //     this.reservation = {};
      // }
  }

  showDetails(id: string){
    this.router.navigateByUrl('reservation-details/' + id);
  }
}
