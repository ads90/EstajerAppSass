import { Component, inject } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AppConfigService } from '../../../services/appconfigservice';
import { TranslateModule } from '@ngx-translate/core';
import { ImageModule } from 'primeng/image';
import { PasswordModule } from 'primeng/password';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        TranslateModule,
        InputTextModule,
        ImageModule,
        PasswordModule,
    ]
})
export class Login  {

  configService = inject(AppConfigService);
}
