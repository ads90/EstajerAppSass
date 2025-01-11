import { Routes } from "@angular/router";
import { Login } from "./components/authentication/login/login.component";
import { OverviewApp } from "./components/overview-app/overview-app.component";
import { Dashboard } from "./components/dashboard/dashboard.component";
import { ForgetPassword } from "./components/authentication/forget-password/forget-password.component";
import { Signup } from "./components/authentication/signup/signup.component";
import { ProductsApp } from "./components/products/products.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'login', component: Login },
    { path: 'signup', component: Signup},
    { path: 'forgetpassword', component: ForgetPassword},
    { path: 'overview', component: OverviewApp },
    { path: 'dashboard', component: Dashboard },
    { path: 'products', component: ProductsApp },
    { path: 'productDetails/:id', component: ProductDetailsComponent },

];
