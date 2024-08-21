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

import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './loginPages/change-password/change-password.component';
import { AddContactsComponent } from './CRM_Module/Companies/Contacts/add-contacts/add-contacts.component';
import { ContactsMainComponent } from './CRM_Module/Companies/Contacts/contacts-main/contacts-main.component';
import { LeadsViewComponent } from './CRM_Module/Leads/leadView/leads-view/leads-view.component';
import { ContactViewComponent } from './CRM_Module/Leads/leadView/contact-view/contact-view.component';
import { EmailConversionComponent } from './CRM_Module/Leads/leadView/email-conversion/email-conversion.component';
import { CallLogsComponent } from './CRM_Module/Leads/leadView/call-logs/call-logs.component';

import { RemindersComponent } from './CRM_Module/Leads/leadView/reminders/reminders.component';
import { ProfileComponent } from './CRM_Module/Companies/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewCompanyComponent } from './CRM_Module/Companies/add-new-company/add-new-company.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BulkUploadMainComponent } from './CRM_Module/Companies/BulkUpload/bulk-upload-main/bulk-upload-main.component';
import { EventsComponent } from './CRM_Module/Leads/events/events.component';
import { QuotesCreateComponent } from './CRM_Module/Companies/Contacts/quotes/quotes-create/quotes-create.component';
import { QuoteslistingComponent } from './CRM_Module/Companies/Contacts/quotes/quoteslisting/quoteslisting.component';
import { CompaniesInfoComponent } from './CRM_Module/Companies/companies-info/companies-info.component';
import { SmsCampaginsComponent } from './CRM_Module/Campagins/Campagins-View/sms-campagins/sms-campagins.component';
import { SocialMediaCampaginsComponent } from './CRM_Module/Campagins/Campagins-View/social-media-campagins/social-media-campagins.component';
import { EmailCampaginsComponent } from './CRM_Module/Campagins/Campagins-View/email-campagins/email-campagins.component';
import { CampaginsComponent } from './CRM_Module/Campagins/Campagins-View/campagins/campagins.component';
import { AddSocialmediaComponent } from './CRM_Module/Campagins/add-socialmedia/add-socialmedia.component';
import { AddLeadsComponent } from './CRM_module/leads/add-leads/add-leads.component';
import { AddCampaginComponent } from './CRM_Module/Campagins/add-campagin/add-campagin.component';
import { CompainesRouteComponent } from './CRM_Module/Companies/compaines-route/compaines-route.component';
import { LeadsRouterComponent } from './CRM_Module/Leads/leads-router/leads-router.component';
import { CampaginsRouteComponent } from './CRM_Module/Campagins/campagins-route/campagins-route.component';
import { DealCreatedVsLostComponent } from './CRM_Module/Reports/deal-created-vs-lost/deal-created-vs-lost.component';
import { ChurnOverviewComponent } from './CRM_Module/Reports/churn-overview/churn-overview.component';
import { RevenuebyMonthuarterearComponent } from './CRM_Module/Reports/revenueby-monthuarterear/revenueby-monthuarterear.component';
import { SalesTeamPermonanceComponent } from './CRM_Module/Reports/sales-team-permonance/sales-team-permonance.component';
import { CompanyProfileComponent } from './CRM_Module/Companies/company-profile/company-profile.component';
import { IndustryComponent } from './CRM_Module/Settings/industry/industry.component';
import { CalltypeComponent } from './CRM_Module/Settings/calltype/calltype.component';
import { CalltypeListComponent } from './CRM_Module/Settings/calltype-list/calltype-list.component';
import { CityComponent } from './CRM_Module/Settings/city/city.component';
import { CityListComponent } from './CRM_Module/Settings/city-list/city-list.component';
import { IndustryListComponent } from './CRM_Module/Settings/industry-list/industry-list.component';
import { LeadStageComponent } from './CRM_Module/Settings/lead-stage/lead-stage.component';
import { LeadStageListComponent } from './CRM_Module/Settings/lead-stage-list/lead-stage-list.component';
import { ProbabilityComponent } from './CRM_Module/Settings/probability/probability.component';
import { LeadStatusComponent } from './CRM_Module/Settings/lead-status/lead-status.component';
import { LeadStatusListComponent } from './CRM_Module/Settings/lead-status-list/lead-status-list.component';
import { ProbabilityListComponent } from './CRM_Module/Settings/probability-list/probability-list.component';
import { QuotetypeComponent } from './CRM_Module/Settings/quotetype/quotetype.component';
import { QuotetypeListComponent } from './CRM_Module/Settings/quotetype-list/quotetype-list.component';
import { TimezoneComponent } from './CRM_Module/Settings/timezone/timezone.component';
import { TimezoneListComponent } from './CRM_Module/Settings/timezone-list/timezone-list.component';
import { IndustrytypeComponent } from './CRM_Module/Settings/industrytype/industrytype.component';
import { IndustrytypeListComponent } from './CRM_Module/Settings/industrytype-list/industrytype-list.component';
import { StateListComponent } from './CRM_Module/Settings/state-list/state-list.component';
import { AddStateComponent } from './CRM_Module/Settings/add-state/add-state.component';
import { CountryListComponent } from './CRM_Module/Settings/country-list/country-list.component';
import { AdCountryComponent } from './CRM_Module/Settings/ad-country/ad-country.component';
import { QuotetypelistComponent } from './CRM_Module/Settings/quotetypelist/quotetypelist.component';
import { AddQuotetypeComponent } from './CRM_Module/Settings/add-quotetype/add-quotetype.component';
import { RemindersDashboardComponent } from './CRM_Module/Dashboard/reminders-dashboard/reminders-dashboard.component';


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
    ProfileComponent,
    AddNewCompanyComponent,
    BulkUploadMainComponent,
    CompaniesInfoComponent,
    SocialMediaCampaginsComponent,
    EmailCampaginsComponent,
    CampaginsComponent,
    QuoteslistingComponent,
    QuotesCreateComponent,
    QuoteslistingComponent,
    SignUpComponent,
    CompaniesInfoComponent,
    AddSocialmediaComponent,
    AddLeadsComponent,
    CompainesRouteComponent,
    LeadsRouterComponent,
    CampaginsRouteComponent,
    DealCreatedVsLostComponent,
    ChurnOverviewComponent,
    DealCreatedVsLostComponent,
    RevenuebyMonthuarterearComponent,
    SalesTeamPermonanceComponent,
    CompanyProfileComponent,
    IndustryComponent,
    CalltypeComponent,
    CalltypeListComponent,
    CityComponent,
    CityListComponent,
    IndustryListComponent,
    LeadStageComponent,
    LeadStageListComponent,
    ProbabilityComponent,
    LeadStatusComponent,
    LeadStatusListComponent,
    ProbabilityListComponent,
    QuotetypeComponent,
    QuotetypeListComponent,
    SettingsMainComponent,
    TimezoneComponent,
    TimezoneListComponent,
    UserProfileComponent,
    IndustrytypeComponent,
    IndustrytypeListComponent,
    StateListComponent,
    AddStateComponent,
    CountryListComponent,
    AdCountryComponent,
    QuotetypelistComponent,
    AddQuotetypeComponent,
    RemindersDashboardComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    BrowserModule,
    NgxPaginationModule,
    MatSnackBarModule,
    AppRoutingModule
  ],
  exports: [
    BrowserModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
