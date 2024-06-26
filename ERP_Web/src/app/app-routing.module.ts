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
import { ContactsMainComponent } from './CRM_Module/Companies/Contacts/contacts-main/contacts-main.component';
import { AddContactsComponent } from './CRM_Module/Companies/Contacts/add-contacts/add-contacts.component';
import { LeadsViewComponent } from './CRM_Module/Leads/leadView/leads-view/leads-view.component';
import { ContactViewComponent } from './CRM_Module/Leads/leadView/contact-view/contact-view.component';
import { EmailConversionComponent } from './CRM_Module/Leads/leadView/email-conversion/email-conversion.component';
import { CallLogsComponent } from './CRM_Module/Leads/leadView/call-logs/call-logs.component';
import { EventsComponent } from './CRM_Module/Leads/leadView/events/events.component';
import { RemindersComponent } from './CRM_Module/Leads/leadView/reminders/reminders.component';
import { ProfileComponent } from './CRM_Module/Companies/profile/profile.component';

const routes: Routes = [

  {
    path: 'CRM', component: CrmMainComponent,
    children: [
      { path: 'Home', component: DashboardMainComponent },
      { path: 'Companies', component: CompanyMainComponent },
      { path: 'contacts', component: ContactsMainComponent },
      { path: 'Leads', component: LeadsMainComponent },
      { path: 'Campagins', component: CampaginsMainComponent },
      { path: 'CampaginsAdd', component: AddCampaginComponent },
      { path: 'Pipeline', component: PipelinesMainComponent },
      { path: 'Reports', component: ReportsMainComponent },
      { path: 'Addnewcompany', component: AddNewCompanyComponent },
      { path: 'editcompany/:id', component: AddNewCompanyComponent },
      { path: 'Settings', component: SettingsMainComponent },
      { path: 'addcontacts', component: AddContactsComponent },
      { path: 'Profileview', component: ProfileComponent } ,
      {
        path: 'leadView/:id', 
        component: LeadsViewComponent,
        children: [
          { path: 'ContactView/:id', component: ContactViewComponent },
          { path: 'emailConversation/:id', component: EmailConversionComponent },
          { path: 'callLogs/:id', component: CallLogsComponent },
          { path: 'events/:id', component: EventsComponent },
          { path: 'reminder/:id', component: RemindersComponent },
        ] 
      },
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
