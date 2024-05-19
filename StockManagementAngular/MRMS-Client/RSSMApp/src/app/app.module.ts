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
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
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
import { ProductViewComponent } from './component/Product/product-view/product-view.component';
import { ProductCreateComponent } from './component/Product/product-create/product-create.component';
import { ProductUpdateComponent } from './component/Product/product-update/product-update.component';
import { StockReportComponent } from './component/report/stock-report/stock-report.component';
import { DistributionViewComponent } from './component/distribution/distribution-view/distribution-view.component';
import { DistributionCreateComponent } from './component/distribution/distribution-create/distribution-create.component';
import { DistributionConfigComponent } from './component/distribution/distribution-config/distribution-config.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { DistributionReportComponent } from './component/distribution/distribution-report/distribution-report.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DamageaddComponent } from './component/modal/damageadd/damageadd.component';
import { CommisionaddComponent } from './component/modal/commisionadd/commisionadd.component';
import { ConcernViewComponent } from './component/concernPerson/concern-view/concern-view.component';
import { StockEditComponent } from './component/stock/stock-edit/stock-edit.component';
import { DistributionEditComponent } from './component/distribution/distribution-edit/distribution-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserviewComponent } from './component/User/userview/userview.component';
import { CompanyAssignComponent } from './component/concernPerson/concern-view/company-assign/company-assign.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfirmDialogComponent,
    HomeComponent,
    FileContainerComponent,
    SignInComponent,
    StockViewComponent,
    StockCreateComponent,
    ProductItemComponent,
    ProductRepeatComponent,
    CompanyViewComponent,
    ProductViewComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    StockReportComponent,
    ProductRepeatComponent,
    DistributionViewComponent,
    DistributionCreateComponent,
    DistributionConfigComponent,
    DistributionReportComponent,
    DamageaddComponent,
    CommisionaddComponent,
    ConcernViewComponent,
    StockEditComponent,
    DistributionEditComponent,
    RegisterComponent,
    UserviewComponent,
    CompanyAssignComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DatePipe,
    ReactiveFormsModule,
    LayoutModule,
    MatModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    FormsModule,
    MatToolbarModule,
    FormlyMatToggleModule,
    MatExpansionModule,
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
