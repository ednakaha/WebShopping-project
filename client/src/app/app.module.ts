import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CityComponent } from './components/city/city.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Register2Component } from './components/register2/register2.component';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { CategoryComponent } from './components/category/category.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { Jwt } from './intercpectors/jwt';
import { ItemShowComponent } from './components/item-show/item-show.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { FilterSearchPipe } from './pipes/filter-search.pipe';
import { SidebarModule } from 'ng-sidebar';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { ShippingDetailsComponent } from './components/shipping-details/shipping-details.component';
import { CityShowComponent } from './components/city-show/city-show.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { AboutComponent } from './components/about/about.component';
import { GeneralComponent } from './components/general/general.component';
import { ItemUpdateComponent } from './components/item-update/item-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileSelectDirective } from 'ng2-file-upload';

// import { HighlightModule } from '../../node_modules/ngx-highlight/highlight.module';



@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    CartItemComponent,
    LoginComponent,
    RegisterComponent,
    CityComponent,
    Register2Component,
    ItemAddComponent,
    CategoryComponent,
    ShoppingPageComponent,
    ItemShowComponent,
    CategoryAddComponent,
    PromptComponent,
    SafeHtmlPipe,
    FilterSearchPipe,
    OrderPageComponent,
    ShippingDetailsComponent,
    CityShowComponent,
    FirstPageComponent,
    AboutComponent,
    GeneralComponent,
    ItemUpdateComponent,
    FileSelectDirective
    //MatCardModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
    // HighlightModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Jwt,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [PromptComponent]
})
export class AppModule { }
