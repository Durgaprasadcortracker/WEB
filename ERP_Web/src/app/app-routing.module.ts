import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './loginPages/login-page/login-page.component';
import { SignUpComponent } from './loginPages/sign-up/sign-up.component';

const routes: Routes = [

  { path: 'CRM', loadChildren: () => import('./crm/crm.module').then(m => m.CRMModule) },
  { path: 'login', component: LoginPageComponent },
  { path: 'SignUp', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
