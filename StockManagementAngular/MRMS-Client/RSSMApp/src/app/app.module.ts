import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { HttpClient,HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationService } from './services/Shared/notification.service';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatModule } from './module/shared/mat/mat.module';
import { MatTabsModule } from '@angular/material/tabs'
import { ConfirmDialogComponent } from './component/shared/confirm-dialog/confirm-dialog.component';
import { HomeComponent } from './component/home/home.component';
import { AuthInterceptor } from './Shared/authconfig.interceptor';
import { FileContainerComponent } from './component/shared/file-container/file-container.component';
import { SignInComponent } from './component/Authentication/sign-in/sign-in.component';
import { RegisterComponent } from './component/Authentication/register/register.component';
import { StockViewComponent } from './component/stock/stock-view/stock-view.component';
import { StockCreateComponent } from './component/stock/stock-create/stock-create.component';
import { ProductItemComponent } from './component/shared/product-item/product-item.component';
import { IglooViewComponent } from './component/igloo/igloo-view/igloo-view.component';
import { IglooCreateComponent } from './component/igloo/igloo-create/igloo-create.component';
import { IglooEditComponent } from './component/igloo/igloo-edit/igloo-edit.component';
import { ZanzeeViewComponent } from './component/zanzee/zanzee-view/zanzee-view.component';
import { ZanzeeCreateComponent } from './component/zanzee/zanzee-create/zanzee-create.component';
import { ZanzeeEditComponent } from './component/zanzee/zanzee-edit/zanzee-edit.component';
import { LovelloEditComponent } from './component/lovello/lovello-edit/lovello-edit.component';
import { LovelloViewComponent } from './component/lovello/lovello-view/lovello-view.component';
import { LovelloCreateComponent } from './component/lovello/lovello-create/lovello-create.component';
import { KazifarmViewComponent } from './component/kazifarm/kazifarm-view/kazifarm-view.component';
import { KazifarmCreateComponent } from './component/kazifarm/kazifarm-create/kazifarm-create.component';
import { KazifarmEditComponent } from './component/kazifarm/kazifarm-edit/kazifarm-edit.component';
import { SavoyReportComponent } from './component/report/savoy-report/savoy-report.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfirmDialogComponent,
    HomeComponent,
    FileContainerComponent,
    SignInComponent,
    RegisterComponent,
    StockViewComponent,
    StockCreateComponent,
    ProductItemComponent,
    IglooViewComponent,
    IglooCreateComponent,
    IglooEditComponent,
    ZanzeeViewComponent,
    ZanzeeCreateComponent,
    ZanzeeEditComponent,
    LovelloEditComponent,
    LovelloViewComponent,
    LovelloCreateComponent,
    KazifarmViewComponent,
    KazifarmCreateComponent,
    KazifarmEditComponent,
    SavoyReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DatePipe,
    ReactiveFormsModule,
    LayoutModule,
    MatModule,
    MatTabsModule,
    FormsModule
  ],
  providers: [
    HttpClient,
    NotificationService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
