import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';

import { CheckOutComponent } from 'src/app/shopping/components/check-out/check-out.component';
import { MyOrdersComponent } from 'src/app/shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from 'src/app/shopping/components/order-success/order-success.component';
import { ProductsComponent } from 'src/app/shopping/components/products/products.component';
import { ShoppingCartComponent } from 'src/app/shopping/components/shopping-cart/shopping-cart.component';

const routes: Routes = [ 
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuardService]} 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShoppingRoutingModule { }
