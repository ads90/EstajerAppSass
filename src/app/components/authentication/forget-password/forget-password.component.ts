import { Component } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputOtpModule } from 'primeng/inputotp';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss'],
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        InputOtpModule,
        FormsModule
    ]
})
export class ForgetPassword  {

    forgotPasswordOTP: string = '023';
}
