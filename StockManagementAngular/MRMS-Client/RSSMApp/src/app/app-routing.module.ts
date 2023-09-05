import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { FileContainerComponent } from './component/shared/file-container/file-container.component';
import { RegisterComponent } from './component/Authentication/register/register.component';
import { SignInComponent } from './component/Authentication/sign-in/sign-in.component';
import { AuthGuard } from './component/auth/guards/auth.guard';
import { SavoyViewComponent } from './component/savoy/savoy-view/savoy-view.component';
import { SavoyCreateComponent } from './component/savoy/savoy-create/savoy-create.component';


const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'FileContainer', component: FileContainerComponent, canActivate: [AuthGuard] },
  { path: 'savoy', component: SavoyViewComponent, canActivate: [AuthGuard] },
  { path: 'savoy-create', component: SavoyCreateComponent, canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
