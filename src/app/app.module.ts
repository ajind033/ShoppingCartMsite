import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import { AuthService } from "./auth.service";
import {QuantityService} from './quantity.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [{
  path:'',
  component:HomeComponent
},{  
  path:'check',
  component:CheckoutComponent,
  canActivate:[AuthService]
},{
  path:'**',
  component:PageNotFoundComponent
}]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CheckoutComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,    
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [QuantityService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
