import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProductsComponent } from './components/products/products.component';
import { SingleProductComponent } from './pages/single-product/single-product.component';
import { LoginComponent } from './pages/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http'
import { BookApiService } from './service/apiService/book-api.service';

import { registerLocaleData } from '@angular/common';
import localeEnIN from '@angular/common/locales/en-IN';
import { CurrencyConverterPipe } from './pipe/currency-converter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
registerLocaleData(localeEnIN, 'en-IN');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CartComponent,
    BannerComponent,
    ProductsComponent,
    SingleProductComponent,
    LoginComponent,
    CurrencyConverterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [BookApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
