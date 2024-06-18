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
    AddCampaginComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule 
  ],
  exports:[
    BrowserModule 
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
