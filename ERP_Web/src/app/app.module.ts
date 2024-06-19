import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './loginPages/login-page/login-page.component';
import { SignUpComponent } from './loginPages/sign-up/sign-up.component';
import { CrmMainComponent } from './CRM_Module/crm-main/crm-main.component';
import { HeaderComponent } from './CRM_Module/UI_Components/header/header.component';
import { SideBarComponent } from './CRM_Module/UI_Components/side-bar/side-bar.component';
import { DashboardMainComponent } from './CRM_Module/Dashboard/dashboard-main/dashboard-main.component';
import { CampaginsMainComponent } from './CRM_Module/Campagins/campagins-main/campagins-main.component';
import { CompanyMainComponent } from './CRM_Module/Companies/company-main/company-main.component';
import { LeadsMainComponent } from './CRM_Module/Leads/leads-main/leads-main.component';
import { PipelinesMainComponent } from './CRM_Module/Pipeline/pipelines-main/pipelines-main.component';
import { ReportsMainComponent } from './CRM_Module/Reports/reports-main/reports-main.component';
import { SettingsMainComponent } from './CRM_Module/Settings/settings-main/settings-main.component';
import { UserProfileComponent } from './CRM_Module/Settings/user-profile/user-profile.component';
import { AddCampaginComponent } from './CRM_Module/Campagins/add-campagin/add-campagin.component';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './loginPages/change-password/change-password.component';
import { AddContactsComponent } from './CRM_Module/Companies/Contacts/add-contacts/add-contacts.component';
import { ContactsMainComponent } from './CRM_Module/Companies/Contacts/contacts-main/contacts-main.component';
import { LeadsViewComponent } from './CRM_Module/Leads/leadView/leads-view/leads-view.component';
import { ContactViewComponent } from './CRM_Module/Leads/leadView/contact-view/contact-view.component';
import { EmailConversionComponent } from './CRM_Module/Leads/leadView/email-conversion/email-conversion.component';
import { CallLogsComponent } from './CRM_Module/Leads/leadView/call-logs/call-logs.component';
import { EventsComponent } from './CRM_Module/Leads/leadView/events/events.component';
import { RemindersComponent } from './CRM_Module/Leads/leadView/reminders/reminders.component';
import { SourcedesignComponent } from './CRM_Module/Settings/Configration/sourcedesign/sourcedesign.component';
import { StagedesignComponent } from './CRM_Module/Settings/Configration/stagedesign/stagedesign.component';
import { ConfigrationComponent } from './CRM_Module/Settings/Configration/configration/configration.component';
import { StatusdesignComponent } from './CRM_Module/Settings/Configration/statusdesign/statusdesign.component';
import { ProfileComponent } from './CRM_Module/Companies/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewCompanyComponent } from './CRM_Module/Companies/add-new-company/add-new-company.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpComponent,
    CrmMainComponent,
    HeaderComponent,
    SideBarComponent,
    DashboardMainComponent,
    CampaginsMainComponent,
    CompanyMainComponent,
    LeadsMainComponent,
    PipelinesMainComponent,
    ReportsMainComponent,
    SettingsMainComponent,
    UserProfileComponent,
    AddCampaginComponent,
    ChangePasswordComponent,
    AddContactsComponent,
    ContactsMainComponent,
    AddNewCompanyComponent,
    LeadsViewComponent,
    ContactViewComponent,
    EmailConversionComponent,
    CallLogsComponent,
    EventsComponent,
    RemindersComponent,
    SourcedesignComponent,
    StagedesignComponent,
    ConfigrationComponent,
    StagedesignComponent,
    StatusdesignComponent,
    ProfileComponent,
    AddNewCompanyComponent
    
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    BrowserModule,
    NgxPaginationModule,
    MatSnackBarModule
  ],
  exports:[
    BrowserModule 
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
