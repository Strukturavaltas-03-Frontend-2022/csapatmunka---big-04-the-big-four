import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { ProductComponent } from './page/product/product.component';
import { CustomerComponent } from './page/customer/customer.component';
import { OrderComponent } from './page/order/order.component';
import { BillComponent } from './page/bill/bill.component';
import { EditComponent } from './page/edit/edit.component';

import { FilterPipe } from './common/data-table/pipe/filter.pipe';
import { SorterPipe } from './common/data-table/pipe/sorter.pipe';

import { TagToBootstrapClassPipe } from './pipe/tag-to-bootstrap-class.pipe';

import { TableColSumPipe } from './common/data-table/pipe/table-col-sum.pipe';
import { DefaultSelectedPipe } from './pipe/default-selected.pipe';
import { HasCorrectKeyPipe } from './pipe/has-correct-key.pipe';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { IdToStringPipe } from './pipe/id-to-string.pipe'


registerLocaleData(localeDe, 'de')


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
    DefaultSelectedPipe,
    HasCorrectKeyPipe,
    IdToStringPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
