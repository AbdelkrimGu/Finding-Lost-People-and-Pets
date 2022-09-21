import { LoginGuard } from './login.guard';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'login', component: LoginComponent , canActivate: [LoginGuard]},
  {path:'register',component: RegisterComponent , canActivate: [LoginGuard] },
  {path:'resetpassword',component: ResetPasswordComponent },
  {path:'login/resetpassword' , redirectTo:'resetpassword'},
  {path:'login/register' , redirectTo:'register'},
  {path:'register/login' , redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { 
  
}
