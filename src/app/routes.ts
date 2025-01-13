import { Routes } from "@angular/router";
import { Login } from "./components/authentication/login/login.component";
import { OverviewApp } from "./components/overview-app/overview-app.component";
import { Dashboard } from "./components/dashboard/dashboard.component";
import { ForgetPassword } from "./components/authentication/forget-password/forget-password.component";
import { Signup } from "./components/authentication/signup/signup.component";
import { ProductsApp } from "./components/products/products.component";
import {ReservationsApp} from './components/reservation/reservations/reservations.component';
import {ReservationDetailsApp} from './components/reservation/reservation-details/reservation-details.component';
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import {CalendarApp} from './components/calendar-app/calendar-app.component';
import {CustomersApp} from './components/customers/customers.component';
import {ReservationCreateApp} from './components/reservation/reservation-create/reservation-create.component';

export const routes: Routes = [
    { path: '', component: Dashboard, children:[
        { path: 'overview', component: OverviewApp },
        { path: 'dashboard', component: Dashboard },
        { path: 'calender', component: CalendarApp },
        { path: 'customers', component: CustomersApp },
        { path: 'products', component: ProductsApp },
        { path: 'reservations', component: ReservationsApp },
        { path: 'productDetails/:id', component: ProductDetailsComponent },
        { path: 'reservation-details/:id', component: ReservationDetailsApp },
        { path: 'reservation-create', component: ReservationCreateApp },

      ] },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup},
    { path: 'forgetpassword', component: ForgetPassword},
];
