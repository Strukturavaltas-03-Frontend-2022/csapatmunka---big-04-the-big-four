import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ProductComponent } from './page/product/product.component';
import { CustomerComponent } from './page/customer/customer.component';
import { OrderComponent } from './page/order/order.component';
import { BillComponent } from './page/bill/bill.component';
import { EditComponent } from './page/edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'bill',
    component: BillComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  },
  {
    path: 'edit-bill/:id',
    component: EditComponent,
  },
  {
    path: 'edit-customer/:id',
    component: EditComponent,
  },
  {
    path: 'edit-order/:id',
    component: EditComponent,
  },
  {
    path: 'edit-product/:id',
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
