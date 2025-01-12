import { Component, Input, Output, EventEmitter } from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-user-search-dialog',
  templateUrl: './user-search-dialog.component.html',
  styleUrls: ['./user-search-dialog.component.scss'],
  imports: [
    DialogModule,
    NgForOf,
    NgIf
  ]
})
export class UserSearchDialogComponent {
  @Input() visible: boolean = false;
  @Input() users: string[] = []; // Assume users are passed as an array of strings
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() userSelected = new EventEmitter<{ name: string }>();  // Event to return selected user to the parent


  close() {
    this.closeDialog.emit(); // Emit event to close dialog
  }

  selectUser(user: { name: string }) {
    this.userSelected.emit(user);
    this.close();  // Optionally close the dialog after selection
  }

}
