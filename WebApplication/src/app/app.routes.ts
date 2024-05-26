
import {Routes} from "@angular/router";
import {HomeComponent} from "./sites/home/home.component";
import {ProductShopComponent} from "./sites/product-shop/product-shop.component";
import {ContactComponent} from "./sites/contact/contact.component";
import {HelpComponent} from "./sites/help/help.component";
import {SiteNotFoundComponent} from "./sites/site-not-found/site-not-found.component";
import {LoginComponent} from "./sites/login/login.component";
import {RegisterComponent} from "./sites/register/register.component";
import {CartComponent} from "./sites/cart/cart.component";
import {CheckoutComponent} from "./sites/checkout/checkout.component";
import {ThankYouPageComponent} from "./sites/thank-you-page/thank-you-page.component";
import {AdminPanelComponent} from "./sites/adminsites/admin-panel/admin-panel.component";
import {MessagesComponent} from "./sites/adminsites/messages/messages.component";
import {OrdersComponent} from "./sites/adminsites/orders/orders.component";


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'product-shop',
    component: ProductShopComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'help',
    component: HelpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'thankYou',
    component: ThankYouPageComponent,
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
  },
  {
    path: 'adminMessages',
    component: MessagesComponent,
  },
  {
    path: 'adminOrders',
    component: OrdersComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: SiteNotFoundComponent,
  }
];
