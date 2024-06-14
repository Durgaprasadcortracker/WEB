import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRMRoutingModule } from './crm-routing.module';
import { CrmMainComponent } from './crm-main/crm-main.component';
import { HeaderComponent } from './UI_Components/header/header.component';
import { SideBarComponent } from './UI_Components/side-bar/side-bar.component';
import { DashboardMainComponent } from './Dashboard/dashboard-main/dashboard-main.component';
import { CampaginsMainComponent } from './Campagins/campagins-main/campagins-main.component';
import { CompanyMainComponent } from './Companies/company-main/company-main.component';
import { LeadsMainComponent } from './Leads/leads-main/leads-main.component';
import { PipelinesMainComponent } from './Pipeline/pipelines-main/pipelines-main.component';
import { ReportsMainComponent } from './Reports/reports-main/reports-main.component';
import { SettingsMainComponent } from './Settings/settings-main/settings-main.component';
import { UserProfileComponent } from './Settings/user-profile/user-profile.component';


@NgModule({
  declarations: [
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
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    CRMRoutingModule
  ],
  exports:[
    CrmMainComponent
  ]
})
export class CRMModule { }
