import { Routes } from "@angular/router";
import { Login } from "./components/authentication/login/login.component";
import { OverviewApp } from "./components/overview-app/overview-app.component";
import { Dashboard } from "./components/dashboard/dashboard.component";
import { ForgetPassword } from "./components/authentication/forget-password/forget-password.component";
import { Signup } from "./components/authentication/signup/signup.component";
import { ProductsApp } from "./components/products/products.component";
import {ReservationsApp} from './components/reservations/reservations.component';
import {ReservationDetailsApp} from './components/reservation-details/reservation-details.component';
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import {CalendarApp} from './components/calendar-app/calendar-app.component';
import {CustomersApp} from './components/customers/customers.component';

export const routes: Routes = [
    { path: '', component: Dashboard, children:[
        { path: 'login', component: Login },
        { path: 'signup', component: Signup},
        { path: 'forgetpassword', component: ForgetPassword},
        { path: 'overview', component: OverviewApp },
        { path: 'dashboard', component: Dashboard },
        { path: 'calender', component: CalendarApp },
        { path: 'customers', component: CustomersApp },
        { path: 'products', component: ProductsApp },
        { path: 'reservations', component: ReservationsApp },
        { path: 'productDetails/:id', component: ProductDetailsComponent },
        { path: 'reservation-details/:id', component: ReservationDetailsApp },
      ] },

];
