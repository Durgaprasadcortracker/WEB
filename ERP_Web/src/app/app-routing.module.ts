import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './loginPages/login-page/login-page.component';
import { SignUpComponent } from './loginPages/sign-up/sign-up.component';
import { CrmMainComponent } from './CRM_Module/crm-main/crm-main.component';
import { DashboardMainComponent } from './CRM_Module/Dashboard/dashboard-main/dashboard-main.component';
import { CompanyMainComponent } from './CRM_Module/Companies/company-main/company-main.component';
import { LeadsMainComponent } from './CRM_Module/Leads/leads-main/leads-main.component';
import { CampaginsMainComponent } from './CRM_Module/Campagins/campagins-main/campagins-main.component';
import { PipelinesMainComponent } from './CRM_Module/Pipeline/pipelines-main/pipelines-main.component';
import { AddCampaginComponent } from './CRM_Module/Campagins/add-campagin/add-campagin.component';
import { ReportsMainComponent } from './CRM_Module/Reports/reports-main/reports-main.component';
import { SettingsMainComponent } from './CRM_Module/Settings/settings-main/settings-main.component';
import { ChangePasswordComponent } from './loginPages/change-password/change-password.component';
import { AddNewCompanyComponent } from './CRM_Module/Companies/add-new-company/add-new-company.component';

const routes: Routes = [

  {
    path: 'CRM', component: CrmMainComponent,
    children: [
      { path: 'Home', component: DashboardMainComponent },
      { path: 'Companies', component: CompanyMainComponent },
      { path: 'Leads', component: LeadsMainComponent },
      { path: 'Campagins', component: CampaginsMainComponent },
      { path: 'CampaginsAdd', component: AddCampaginComponent },
      { path: 'Pipeline', component: PipelinesMainComponent },
      { path: 'Reports', component: ReportsMainComponent },
      { path: 'Addnewcompany', component: AddNewCompanyComponent },
      { path: 'editcompany/:id', component: AddNewCompanyComponent },
      { path: '**', redirectTo: '/CRM/Home' }
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'Changepassword', component: ChangePasswordComponent},
  { path: '**', redirectTo: '/CRM' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
