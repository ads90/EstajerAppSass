import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { Table } from 'primeng/table';
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
import {ChecksOutService} from '../../../services/check-out.service';
import {ChecksOut} from '../../../domain/check-out';

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
  selector: 'checks-out-checks-in-app',
  providers: [ChecksOutService, MessageService, ConfirmationService],
  templateUrl: './checks-out-checks-in.component.html',
  styleUrl: './checks-out-checks-in.component.scss',
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
export class ChecksOutChecksInComponent implements OnInit {

  search: string = '';

  checksOutDialog: boolean = false;

  checksOuts!: ChecksOut[];

  checksOut!: ChecksOut;

  selectedChecksOuts!: ChecksOut[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  cols!: Column[];

  exportColumns!: ExportColumn[];

  constructor(
      private checksOutService: ChecksOutService,
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
      this.checksOutService.getChecksOuts().then((data) => {
          this.checksOuts = data;
          this.cd.markForCheck();
      });

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];

      this.cols = [
          { field: 'code', header: 'Code', customExportHeader: 'ChecksOut Code' },
          { field: 'name', header: 'Name' },
          { field: 'image', header: 'Image' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  openNew() {
      this.checksOut = {};
      this.submitted = false;
      this.checksOutDialog = true;
  }

  editChecksOut(checksOut: ChecksOut) {
      this.checksOut = { ...checksOut };
      this.checksOutDialog = true;
  }

  deleteSelectedChecksOuts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected checksOuts?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.checksOuts = this.checksOuts.filter((val) => !this.selectedChecksOuts?.includes(val));
              this.selectedChecksOuts = null;
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'ChecksOuts Deleted',
                  life: 3000
              });
          }
      });
  }

  hideDialog() {
      this.checksOutDialog = false;
      this.submitted = false;
  }

  deleteChecksOut(checksOut: ChecksOut) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + checksOut.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.checksOuts = this.checksOuts.filter((val) => val.id !== checksOut.id);
              this.checksOut = {};
              this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'ChecksOut Deleted',
                  life: 3000
              });
          }
      });
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.checksOuts.length; i++) {
          if (this.checksOuts[i].id === id) {
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

  saveChecksOut() {
      // this.submitted = true;
      //
      // if (this.checksOut.name?.trim()) {
      //     if (this.checksOut.id) {
      //         this.checksOuts[this.findIndexById(this.checksOut.id)] = this.checksOut;
      //         this.messageService.add({
      //             severity: 'success',
      //             summary: 'Successful',
      //             detail: 'ChecksOut Updated',
      //             life: 3000
      //         });
      //     } else {
      //         this.checksOut.id = this.createId();
      //         this.checksOut.image = 'checksOut-placeholder.svg';
      //         this.checksOuts.push(this.checksOut);
      //         this.messageService.add({
      //             severity: 'success',
      //             summary: 'Successful',
      //             detail: 'ChecksOut Created',
      //             life: 3000
      //         });
      //     }
      //
      //     this.checksOuts = [...this.checksOuts];
      //     this.checksOutDialog = false;
      //     this.checksOut = {};
      // }
  }

  showDetails(id: string){
    this.router.navigateByUrl('check-out-details/' + id);
  }

  createNewChecksOut(){
    this.router.navigateByUrl('check-out-create');
  }
}
