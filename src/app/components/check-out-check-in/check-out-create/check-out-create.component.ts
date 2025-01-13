import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Dialog, DialogModule} from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { Table } from 'primeng/table';
import { ReservationService } from '../../../services/reservation.service';
import { Reservation } from '../../../domain/reservation';
import {CommonModule, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Route, Router, RouterModule} from '@angular/router';
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
import {TabsModule} from 'primeng/tabs';
import {DatePickerModule} from 'primeng/datepicker';
import {FloatLabelModule} from 'primeng/floatlabel';
import {CardModule} from 'primeng/card';
import {TimelineModule} from 'primeng/timeline';
import {InputTextarea} from 'primeng/inputtextarea';
import {SkeletonModule} from 'primeng/skeleton';
import {UserSearchDialogComponent} from '../../common/user-search-dialog/user-search-dialog.component';
import {AddItemsDialogComponent} from '../../common/add-items-dialog/add-items-dialog.component';
import {ChecksOut} from '../../../domain/check-out';
import {QrScannerComponent} from '../../common/qr-scanner/qr-scanner.component';

interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
  user?: string;
}

interface Comment {
  text: string;
  date: string; // Date in YYYY-MM-DD format
  time: string; // Time in 12-hour format (hh:mm AM/PM)
}

interface Product {
  name: string;
  code: string;
  quantity: number;
  data: any;  // You can replace 'any' with a more specific type if needed
  base64Img: string;
}

type FileData = {
  base64: string;
  size: number;  // Size in bytes
  name: string;
  date: string; // Date in YYYY-MM-DD format
  time: string; // Time in 12-hour format (hh:mm AM/PM)
};

@Component({
  selector: 'check-out-create-app',
  providers: [ReservationService, MessageService, ConfirmationService],
  templateUrl: './check-out-create.component.html',
  styleUrl: './check-out-create.component.scss',
   imports: [
    CommonModule,
    RouterModule,
    TabsModule,
    FormsModule,
    DatePickerModule,
    FloatLabelModule,
    CardModule,
     TimelineModule,
     InputTextarea,
     FileUploadModule,
     SkeletonModule,
     TableModule,
     InputTextModule,
     ButtonModule,
     ToolbarModule,
     UserSearchDialogComponent,
     AddItemsDialogComponent,
     QrScannerComponent,
     DialogModule,
     NgIf
   ]
})

export class CheckOutCreateComponent implements OnInit {

  checkOut : ChecksOut = {
    name: "Untitled check-out",
    status: "Draft"
  }
  datetime12h1: Date[] | undefined;
  datetime12h2: Date[] | undefined;
  events: EventItem[] = [];
  uploadedFiles: FileData[] = [];
  comments: Comment[] = [
  ];

  files: FileData[] = [
  ];

  user = {
    name: "Abdullah Tahan",
    email: "care@softs.ca",
    img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAABU9JREFUeF7tmltMVFcUhv9BB5C23qqCWpGqjWAVtSIqKiVUtE7QBlBCEGO1LWnjJabRxBffjSZ9sFYTG2+JJQQLxEumWKKlk3g3EYgWGotaotZqW61aCs5MMWeQI5zZw9lnZpqVzF7zOuvsNfN/59//Ohfbx5t2dII/ZArYGACZ9r7GDIBWfwZArD8DYADUChD35wxgAMQKELdnBzAAYgWI27MDGACxAsTt2QEMgFgB4vbsAAZArABxe3YAAyBWgLg9O4ABECtA3J4dwACIFSBuzw5gAMQKELdnBzAAYgWI27MDGACxAsTt2QEqA8jKmIZljncRE2PXZfB6/0Ot6zIqnS4paVYtX4R56VOkakMtevT3U+wrd6L5l9ZQl9KPJ3XA+jX5SE0Z5/dnWu/cx4495WjveGb6RxmAqUTignFjR6J0xRK8PmSgX0FHhxvfOn9E3dl609UZgKlE4oICRyZyMtPQr1+Ur6CzsxM2m00vbmy6gS/3V5muzgBMJRIXbFlbjPFJo3Txb92+h6Q3EnQIj5+04UDFd7jafDPIDv6HzZkxCcV5CxAbE61/2XS9FV/srQhbD6sLkWTArOkpKM57D3EDYn2/t+OZG67zDZiXnooBsV3iWA1jmT/OAF6oVJKfg8zZqfrZrk0XB4/UoHBJFkbFD9O1tBLGDEBGAQDxw4dg3eo8JAwfqh/Rcusutn1VhlWFizA3bQq6o8BKGMu0ZwcAyJ47HfmOTMREd83+WvjWnatHWfUpZKRNRtEH2fo2pH0vG8YMQEYBAMbZ/5+2dhyurMXlxp994bj5syIkjh6hrxbOMFbeAckTEvFRkQODB70acJ835kNPh0gyDlimPADR7N+9/XSrlpY6ESUFOXglrmtC0j7hCmPlAWzduBKJo+N1YZ88bcOhIyfR8FNLr7O25zWCb0y1cGXcl0uUBmCc/TWhrt+8je27y/00MzolXGGsNADjiOnxelHzw0UcPXnGD8Dk5DexunAxBr4WF9YwVhaAaPb/8+Fj7P3mOG78+ptw1/i8tBApbyXq32lh7DrfiMNVtUFnsbIA3s9Kx9KFGbDb++vimc33juxZyM2ZA3v/l8eEGsbKAjDO/m63B8e+P4uauosBz+akMQn4dKV2u3qQXhNqGCsJQLSf3//jEXbur8TvDx72uZ2UluRi5tTkXjVmzuEpyKCA/+wPXKpvxtdlJ0z3ctEjy1CujJV0gHH2t7KNiMI7lDBWDoBo9jc97SUK7j34C7sOVJtuYcallAPwSXEuZk5L1m8vS2grVWLFRT0XVAqAaPuQUleyKJgwVgqAaI73eLzQroCtfrSH9dF2ey8nBRPGSgEwzv6hhKfoFZZg1lMGgGj2D3TnU9YN6z7Mw9S3x/cqtxrGygBYnpuFBfPfQVRU1zs/2ifQnU9ZAKJrAu1tiiqnC6fPXJFaRgkAoseKfd35lFIOED6u1I61EsZKABDN/mZ3PmUhiJxlJYyVACCa/RuutWDXwWpZnQPWibLFShhHPABt9t+wpgAjhg0O2x1MIw3RG9WyYRzxAESzv6w4svYwvlekHef2eHCi9hycpy/0uUzEA/g/nmIZFQ10hS0TxhENQLQ/t/3b7nvj7cKVJtkTXKrO+O6QdpBMGEc0ACnluMhPAZLX05nDSwUYAPHZwAAYALECxO3ZAQyAWAHi9uwABkCsAHF7dgADIFaAuD07gAEQK0Dcnh3AAIgVIG7PDmAAxAoQt2cHMABiBYjbswMYALECxO3ZAQyAWAHi9uwABkCsAHF7dgADIFaAuD07gAEQK0Dcnh3AAIgVIG7PDiAG8BzHt8xOrPdwAAAAAABJRU5ErkJggg=="
  }

  products: Product[] = [
  ];

  isDialogVisible = false;
  users = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];

  displayItemsDialog: boolean = false; // Controls visibility of the dialog


  constructor(
      private reservationService: ReservationService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private cd: ChangeDetectorRef,
      private router: Router
  ) {}

    ngOnInit(): void {
      this.events = [
        { user: 'Abdullah Tahan', status: 'converted reservation to check-out', date: '12:58am', icon: 'pi pi-user', color: '#9C27B0', image: 'game-controller.jpg' },
        { user: 'Abdullah Tahan', status: 'reserved equipment', date: '10:58pm', icon: 'pi pi-user', color: '#673AB7' },
        { user: '', status: 'Sent mail to care@softs.ca, care@softs.ca', date: '20:58pm', icon: 'pi pi-envelope', color: '#FF9800' },
        { user: 'Abdullah Tahan', status: 'Delivered', date: '10:58pm', icon: 'pi pi-user', color: '#607D8B' }
      ];
    }

  onUserSelected(user: { name: string }) {
    this.checkOut.user = user.name;  // Store selected user
  }

  onCancelClick(){
    this.router.navigateByUrl('/reservations');
  }

  closeCard() {
    // Logic to close or hide the card
    this.checkOut.user = '';  // For example, setting reservation to null
  }

  // Method to show the dialog
  showItemsDialog() {
    this.displayItemsDialog = true;
  }

  // Handle the selected items passed from the dialog
  handleSavedItems(selectedItems: any[]|any) {
    this.products = [];
    selectedItems.forEach((item: any) => {
      this.products.push( {
        name: item.productName,
        code: item.code,
        quantity: 1,
        data: { description: "This is product 1", category: "Category A" },
        base64Img: "data:image/jpeg;base64,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"
      });
    })
    this.displayItemsDialog = false;
  }


  isScanDialogVisible = false;
  scannedResult: string | null = null;

  openScanDialog() {
    this.isScanDialogVisible = true;
  }

  closeScanDialog() {
    this.isScanDialogVisible = false;
  }

  handleScannedResult(result: string | any) {
    this.scannedResult = result;
    this.closeScanDialog(); // Close the dialog when result is obtained
  }
}
