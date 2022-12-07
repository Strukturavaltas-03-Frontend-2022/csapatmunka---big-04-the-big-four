import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { ProductComponent } from './page/product/product.component';
import { CustomerComponent } from './page/customer/customer.component';
import { OrderComponent } from './page/order/order.component';
import { BillComponent } from './page/bill/bill.component';
import { EditComponent } from './page/edit/edit.component'

import { FilterPipe } from './common/data-table/pipe/filter.pipe';
import { SorterPipe } from './common/data-table/pipe/sorter.pipe';

import { TagToBootstrapClassPipe } from './pipe/tag-to-bootstrap-class.pipe';

import { TableColSumPipe } from './common/data-table/pipe/table-col-sum.pipe';
import { DefaultSelectedPipe } from './pipe/default-selected.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    HeaderComponent,
    DataTableComponent,
    ProductComponent,
    CustomerComponent,
    OrderComponent,
    BillComponent,
    FilterPipe,
    SorterPipe,
    EditComponent,
    TagToBootstrapClassPipe,
    TableColSumPipe,
    DefaultSelectedPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
