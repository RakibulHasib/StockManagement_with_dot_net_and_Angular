import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { HttpClient,HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationService } from './services/Shared/notification.service';
import { CommonModule, DatePipe } from '@angular/common';
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
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ProductRepeatComponent } from './component/shared/product-repeat/product-repeat.component';
import { CompanyViewComponent } from './component/Company/company-view/company-view.component';
import { CompanyCreateComponent } from './component/Company/company-create/company-create.component';
import { CompanyUpdateComponent } from './component/Company/company-update/company-update.component';
import { ProductViewComponent } from './component/Product/product-view/product-view.component';
import { ProductCreateComponent } from './component/Product/product-create/product-create.component';
import { ProductUpdateComponent } from './component/Product/product-update/product-update.component';
import { StockReportComponent } from './component/report/stock-report/stock-report.component';
import { DistributionViewComponent } from './component/distribution/distribution-view/distribution-view.component';
import { DistributionCreateComponent } from './component/distribution/distribution-create/distribution-create.component';
import { DistributionConfigComponent } from './component/distribution/distribution-config/distribution-config.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';



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
    ProductRepeatComponent,
    CompanyViewComponent,
    CompanyCreateComponent,
    CompanyUpdateComponent,
    ProductViewComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    StockReportComponent,
    ProductRepeatComponent,
    DistributionViewComponent,
    DistributionCreateComponent,
    DistributionConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DatePipe,
    ReactiveFormsModule,
    LayoutModule,
    MatModule,
    MatTabsModule,
    FormsModule,
    FormlyMatToggleModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true, resetFieldOnHide: true },
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [
        { name: 'product-repeat', component: ProductRepeatComponent },
        { name: 'product-distribution', component: DistributionConfigComponent }
      ],
    }),
    FormlyMaterialModule
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
