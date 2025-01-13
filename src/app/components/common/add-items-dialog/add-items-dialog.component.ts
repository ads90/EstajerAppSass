import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {CommonModule, NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-items-dialog',
  templateUrl: './add-items-dialog.component.html',
  styleUrls: ['./add-items-dialog.component.scss'],
  imports: [
    CommonModule,  // Required for Angular directives like ngIf, ngFor, etc.
    FormsModule,   // Required for two-way data binding (ngModel)
    ReactiveFormsModule,  // Optional: For Reactive Forms (if used)
    ButtonModule,  // Required for PrimeNG buttons
    DialogModule,  // Required for PrimeNG dialogs
    TableModule,   // Required for PrimeNG tables
    CheckboxModule,  // Required for PrimeNG checkboxes
  ],
})
export class AddItemsDialogComponent {
  @Input() displayDialog: boolean = false;  // Controls dialog visibility
  items: any[] = [];  // List of items in the table
  selectedItems: any[] = [];  // List of selected items

  @Output() saveSelectedItems: EventEmitter<any[]> = new EventEmitter<any[]>();

  constructor() {
    // Sample data for the table
    this.items = [
      { productName: 'Item 1', code: 'P001', selected: false},
      { productName: 'Item 2', code: 'P002', selected: false },
      { productName: 'Item 3', code: 'P003', selected: false },
      { productName: 'Item 4', code: 'P004', selected: false }
    ];
  }

  // Open the dialog
  showDialog() {
    this.displayDialog = true;
  }

  // Close the dialog
  closeDialog() {
    this.displayDialog = false;  // Hide the dialog
  }

  // Save selected items and emit them to the parent component
  saveItems() {
    this.selectedItems = this.items.filter(x => x.selected)
    this.saveSelectedItems.emit(this.selectedItems);  // Emit selected items to parent
    this.displayDialog = false;  // Close the dialog after saving
  }
}
