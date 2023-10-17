import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FileContainerComponent } from './component/shared/file-container/file-container.component';
import { RegisterComponent } from './component/Authentication/register/register.component';
import { SignInComponent } from './component/Authentication/sign-in/sign-in.component';
import { AuthGuard } from './component/auth/guards/auth.guard';
import { StockViewComponent } from './component/stock/stock-view/stock-view.component';
import { StockCreateComponent } from './component/stock/stock-create/stock-create.component';
import { IglooViewComponent } from './component/igloo/igloo-view/igloo-view.component';
import { LovelloViewComponent } from './component/lovello/lovello-view/lovello-view.component';
import { ZanzeeViewComponent } from './component/zanzee/zanzee-view/zanzee-view.component';
import { KazifarmViewComponent } from './component/kazifarm/kazifarm-view/kazifarm-view.component';
import { SavoyReportComponent } from './component/report/savoy-report/savoy-report.component';


const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'FileContainer', component: FileContainerComponent, canActivate: [AuthGuard] },
  { path: 'stock/:company', component: StockViewComponent, canActivate: [AuthGuard] },
  { path: 'stock-create/:id', component: StockCreateComponent, canActivate: [AuthGuard] },
  { path: 'igloo', component: IglooViewComponent, canActivate: [AuthGuard] },
  { path: 'lovello', component: LovelloViewComponent, canActivate: [AuthGuard] },
  { path: 'zanzee', component: ZanzeeViewComponent, canActivate: [AuthGuard] },
  { path: 'kazifarm', component: KazifarmViewComponent, canActivate: [AuthGuard] },
  { path: 'savoy_report/:id', component: SavoyReportComponent, canActivate: [AuthGuard] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
