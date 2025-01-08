import { Component } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    imports: [
        ButtonModule,
        CheckboxModule,
        InputTextModule 
    ]
})
export class Signup  {

}
