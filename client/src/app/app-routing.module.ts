import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { LoggedGuard } from 'src/app/gaurds/logged.guard';
import { CartItemComponent } from 'src/app/components/cart-item/cart-item.component';
import { CityComponent } from 'src/app/components/city/city.component';
import { RegisterComponent } from './components/register/register.component';
import { Register2Component } from './components/register2/register2.component';
import { ShoppingPageComponent } from './components/shopping-page/shopping-page.component';
import { CategoryComponent } from './components/category/category.component';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { ItemShowComponent } from './components/item-show/item-show.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { CategoryAddComponent} from './components/category-add/category-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'first-Page', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'first-Page', component: FirstPageComponent },
  { path: 'category-add', component: CategoryAddComponent },
  { path: 'cart', component: CartComponent, canActivate: [LoggedGuard] },
  { path: 'cart-item/:id', component: CartItemComponent, canActivate: [LoggedGuard] },
  { path: 'city', component: CityComponent, canActivate: [LoggedGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'register2', component: Register2Component },//todo just after register1?
  {
    path: 'shopping-page',
    component: ShoppingPageComponent,
    canActivate: [LoggedGuard],
    children: [
      {
        path: 'item-show/getListItemByCat/:id',
        component: ItemShowComponent,
        canActivate: [LoggedGuard]
      }//, outlet:"categoryOutlet"},}
    ]
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [LoggedGuard]
  },
  { path: 'item-add/getByCategory/:id', component: ItemAddComponent, canActivate: [LoggedGuard] },
  // { path: 'item-show/getListItemByCat/:id', component: ItemShowComponent, canActivate: [LoggedGuard] },//, outlet:"categoryOutlet"},
  { path: 'item-add', component: ItemAddComponent, canActivate: [LoggedGuard] },
  { path: 'item-show', component: ItemShowComponent, canActivate: [LoggedGuard] },
  { path: 'cart-item', component: CartItemComponent, canActivate: [LoggedGuard] },
  { path: 'cart-item/cartItemExpanded/:id', component: CartItemComponent, canActivate: [LoggedGuard] },
  { path: 'prompt', component: PromptComponent },
  { path: 'cart/getOrSetCart/:id', component: CartItemComponent, canActivate: [LoggedGuard] },
  { path: 'order-page', component: OrderPageComponent, canActivate: [LoggedGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
