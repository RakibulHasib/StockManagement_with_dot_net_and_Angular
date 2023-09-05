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
import { SavoyViewComponent } from './component/savoy/savoy-view/savoy-view.component';
import { SavoyCreateComponent } from './component/savoy/savoy-create/savoy-create.component';
import { ProductItemComponent } from './component/shared/product-item/product-item.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfirmDialogComponent,
    HomeComponent,
    FileContainerComponent,
    SignInComponent,
    RegisterComponent,
    SavoyViewComponent,
    SavoyCreateComponent,
    ProductItemComponent
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
