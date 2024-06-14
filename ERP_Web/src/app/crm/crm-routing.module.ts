import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrmMainComponent } from './crm-main/crm-main.component';
import { DashboardMainComponent } from './Dashboard/dashboard-main/dashboard-main.component';
import { CompanyMainComponent } from './Companies/company-main/company-main.component';
import { LeadsMainComponent } from './Leads/leads-main/leads-main.component';
import { CampaginsMainComponent } from './Campagins/campagins-main/campagins-main.component';
import { PipelinesMainComponent } from './Pipeline/pipelines-main/pipelines-main.component';
import { ReportsMainComponent } from './Reports/reports-main/reports-main.component';
import { SettingsMainComponent } from './Settings/settings-main/settings-main.component';

const routes: Routes = [
  { path: '', component: CrmMainComponent,
    children: [
      { path: '', component: DashboardMainComponent },
      { path: 'Home', component: DashboardMainComponent },
      { path: 'Companies', component: CompanyMainComponent },
      { path: 'Leads', component: LeadsMainComponent },
      { path: 'Campagins', component: CampaginsMainComponent },
      { path: 'Pipeline', component: PipelinesMainComponent },
      { path: 'Reports', component: ReportsMainComponent },
      { path: 'Settings', component: SettingsMainComponent }
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRMRoutingModule { }
