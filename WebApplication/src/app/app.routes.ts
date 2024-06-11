
import {Routes} from "@angular/router";
import {HomeComponent} from "./sites/home/home.component";
import {ProductShopComponent} from "./sites/product-shop/product-shop.component";
import {ContactComponent} from "./sites/contact/contact.component";
import {HelpComponent} from "./sites/help/help.component";
import {SiteNotFoundComponent} from "./sites/site-not-found/site-not-found.component";
import {LoginPageComponent} from "./sites/login-page/login-page.component";
import {CartComponent} from "./sites/cart/cart.component";
import {CheckoutComponent} from "./sites/checkout/checkout.component";
import {ThankYouPageComponent} from "./sites/thank-you-page/thank-you-page.component";
import {AdminPanelComponent} from "./sites/adminsites/admin-panel/admin-panel.component";
import {MessagesComponent} from "./sites/adminsites/messages/messages.component";
import {OrdersPageComponent} from "./sites/adminsites/orders-page/orders-page.component";
import {AddBreadPageComponent} from "./sites/adminsites/add-bread-page/add-bread-page.component";
import {loginGuard} from "./guards/login.guard";


export const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
  }, {
    path: 'product-shop', component: ProductShopComponent,
  }, {
    path: 'contact', component: ContactComponent,
  }, {
    path: 'help', component: HelpComponent,
  }, {
    path: 'login', component: LoginPageComponent,
  }, {
    path: 'cart', component: CartComponent,
  }, {
    path: 'checkout', component: CheckoutComponent,
  }, {
    path: 'thankYou', component: ThankYouPageComponent,
  }, {
    path: 'admin', component: AdminPanelComponent, canActivate:[loginGuard]
  }, {
    path: 'adminMessages', component: MessagesComponent, canActivate:[loginGuard]
  }, {
    path: 'adminOrders', component: OrdersPageComponent, canActivate:[loginGuard]
  }, {
    path: 'addBread', component: AddBreadPageComponent, canActivate:[loginGuard]
  }, {
    path: '', redirectTo: 'home', pathMatch: 'full',
  }, {
    path: '**', component: SiteNotFoundComponent,
  }
];
