import { Component, Output, EventEmitter } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';
import {ButtonModule} from 'primeng/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
  imports:[
    ButtonModule,
    NgIf
  ]
})
export class QrScannerComponent {
  @Output() scannedResult = new EventEmitter<string>(); // Emit the scanned result to parent
  isScanning = false;
  codeReader = new BrowserMultiFormatReader();

  startScan() {
    this.isScanning = true;
    this.codeReader.decodeOnceFromVideoDevice(undefined, 'video')
      .then(result => {
        this.isScanning = false;
        this.scannedResult.emit(result.getText()); // Emit scanned result
      })
      .catch(err => {
        this.isScanning = false;
        console.error(err);
      });
  }
}
