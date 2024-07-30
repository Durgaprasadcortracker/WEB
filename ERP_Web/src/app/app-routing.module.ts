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
import { RemindersComponent } from './CRM_Module/Leads/leadView/reminders/reminders.component';
import { ProfileComponent } from './CRM_Module/Companies/profile/profile.component';
import { BulkUploadMainComponent } from './CRM_Module/Companies/BulkUpload/bulk-upload-main/bulk-upload-main.component';
import { UserProfileComponent } from './CRM_Module/Settings/user-profile/user-profile.component';
import { QuotesCreateComponent } from './CRM_Module/Companies/Contacts/quotes/quotes-create/quotes-create.component';
import { EventsComponent } from './CRM_Module/Leads/events/events.component';
import { CompaniesInfoComponent } from './CRM_Module/Companies/companies-info/companies-info.component';
import { AddEmailConversationComponent } from './CRM_Module/Campagins/add-email-conversation/add-email-conversation.component';
import { CampaginsComponent } from './CRM_Module/Campagins/Campagins-View/campagins/campagins.component';
import { EmailCampaginsComponent } from './CRM_Module/Campagins/Campagins-View/email-campagins/email-campagins.component';
import { SocialMediaCampaginsComponent } from './CRM_Module/Campagins/Campagins-View/social-media-campagins/social-media-campagins.component';
import { SmsCampaginsComponent } from './CRM_Module/Campagins/Campagins-View/sms-campagins/sms-campagins.component';
import { QuoteslistingComponent } from './CRM_Module/Companies/Contacts/quotes/quoteslisting/quoteslisting.component';
import { QuotesInvoiceComponent } from './CRM_Module/Companies/Contacts/quotes/quotes-invoice/quotes-invoice.component';
import { AddCampaginComponent } from './CRM_Module/Campagins/add-campagin/add-campagin.component';

import { CompainesRouteComponent } from './CRM_Module/Companies/compaines-route/compaines-route.component';
import { LeadsRouterComponent } from './CRM_Module/Leads/leads-router/leads-router.component';
import { CampaginsRouteComponent } from './CRM_Module/Campagins/campagins-route/campagins-route.component';
import { DealCreatedVsLostComponent } from './CRM_Module/Reports/deal-created-vs-lost/deal-created-vs-lost.component';
import { ChurnOverviewComponent } from './CRM_Module/Reports/churn-overview/churn-overview.component';
import { SalesTeamPermonanceComponent } from './CRM_Module/Reports/sales-team-permonance/sales-team-permonance.component';
import { RevenuebyMonthuarterearComponent } from './CRM_Module/Reports/revenueby-monthuarterear/revenueby-monthuarterear.component';
import { CompanyProfileComponent } from './CRM_Module/Companies/company-profile/company-profile.component';
import { AddLeadsComponent } from './CRM_module/leads/add-leads/add-leads.component';
import { LeadStatusComponent } from './CRM_Module/Settings/lead-status/lead-status.component';
import { LeadStatusListComponent } from './CRM_Module/Settings/lead-status-list/lead-status-list.component';
import { LeadStageComponent } from './CRM_Module/Settings/lead-stage/lead-stage.component';
import { LeadStageListComponent } from './CRM_Module/Settings/lead-stage-list/lead-stage-list.component';
import { ProbabilityListComponent } from './CRM_Module/Settings/probability-list/probability-list.component';
import { ProbabilityComponent } from './CRM_Module/Settings/probability/probability.component';
import { TimezoneListComponent } from './CRM_Module/Settings/timezone-list/timezone-list.component';
import { TimezoneComponent } from './CRM_Module/Settings/timezone/timezone.component';
import { IndustrytypeListComponent } from './CRM_Module/Settings/industrytype-list/industrytype-list.component';
import { IndustrytypeComponent } from './CRM_Module/Settings/industrytype/industrytype.component';
import { CalltypeListComponent } from './CRM_Module/Settings/calltype-list/calltype-list.component';
import { CalltypeComponent } from './CRM_Module/Settings/calltype/calltype.component';
import { IndustryListComponent } from './CRM_Module/Settings/industry-list/industry-list.component';
import { IndustryComponent } from './CRM_Module/Settings/industry/industry.component';
import { CityListComponent } from './CRM_Module/Settings/city-list/city-list.component';
import { CityComponent } from './CRM_Module/Settings/city/city.component';



const routes: Routes = [

  {
    path: 'CRM', component: CrmMainComponent,
    children: [
      { path: 'Home', component: DashboardMainComponent },
      //-----------------------Companies---------------------------
      {
        path: 'Companies', component: CompainesRouteComponent,
        children: [
          { path: 'listing', component: CompanyMainComponent },
          { path: 'add', component: AddNewCompanyComponent },
          { path: 'edit/:id', component: AddNewCompanyComponent },
          { path: 'companiesinfo/:id', component: CompaniesInfoComponent},
          { path: 'add-contacts/:companyid', component: AddContactsComponent },
          { path: 'edit-contacts/:companyid/:id', component: AddContactsComponent },
          { path: 'add-quotes/:companyid', component: QuotesCreateComponent },
          {
            path: 'companiesinfo/:id', component: CompaniesInfoComponent,
            children: [
              { path: 'profile/:id', component: CompanyProfileComponent },
              { path: 'contact/:id', component: ContactsMainComponent },
              { path: 'quotation/:id', component: QuoteslistingComponent },
            ]
          },
          { path: 'bulk-upload', component: BulkUploadMainComponent },
          { path: '**', redirectTo: '/CRM/Companies/listing' }
        ]
      },
      //-----------------------Leads-------------------------------
      {
        path: 'Leads', component: LeadsRouterComponent,
        children: [
          { path: 'listing', component: LeadsMainComponent },
          { path: 'add-leads', component: AddLeadsComponent },
          { path: 'edit-leads/:id', component: AddLeadsComponent },
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
          { path: '**', redirectTo: '/CRM/Leads/listing' }
        ]
      },
      //-----------------------Campagins---------------------------
      {
        path: 'Campagins', component: CampaginsRouteComponent,
        children: [
          { path: 'add-campagin', component: AddCampaginComponent },
          { path: 'editcampaign/:id', component: AddCampaginComponent },
          { path: 'add-email', component: AddEmailConversationComponent },
          {
            path: 'main', component: CampaginsMainComponent,
            children: [
              { path: 'campagins', component: CampaginsComponent },
              { path: 'email-conversation', component: EmailCampaginsComponent },
              { path: 'social-media-campagins', component: SocialMediaCampaginsComponent },
              { path: 'sms-campagins', component: SmsCampaginsComponent },
              { path: '**', redirectTo: '/CRM/Campagins/main/campagins' }
            ]
          },
          { path: '**', redirectTo: '/CRM/Campagins/main' }
        ]
      },

      {
        path: 'Settings', component: SettingsMainComponent, children: [
          {
            path: 'status', component: LeadStatusComponent,

          }, { path: 'statuslist', component: LeadStatusListComponent },
          {
            path: 'leadstage', component: LeadStageComponent,

          }, { path: 'leadstagelist', component: LeadStageListComponent },
          { path: 'probabilitylist', component: ProbabilityListComponent },
          { path: 'probability', component: ProbabilityComponent },
          { path: 'timezonelist', component: TimezoneListComponent },
          { path: 'timezone', component: TimezoneComponent },
          { path: 'industrytypelist', component: IndustrytypeListComponent },
          { path: 'industrytype', component: IndustrytypeComponent },
          { path: 'calltypelist', component: CalltypeListComponent },
          { path: 'calltype', component: CalltypeComponent },
          { path: 'industrylist', component: IndustryListComponent },
          { path: 'industry', component: IndustryComponent },
          { path: 'citylist', component: CityListComponent },
          { path: 'city', component: CityComponent }

        ]
      }, 

      { path: 'add-contacts', component: AddContactsComponent },
      { path: 'edit-contacts/:id', component: AddContactsComponent },
      // { path: 'Leads', component: LeadsMainComponent },
      // { path: 'add-leads', component: AddLeadsComponent },
      // { path: 'contacts', component: ContactsMainComponent },
      { path: 'Leads', component: LeadsMainComponent },
     // { path: 'add-leads', component: AddLeadsComponent },
     // { path: 'edit-leads/:id', component: AddLeadsComponent },
      // { path: 'Campagins', component: CampaginsMainComponent },

      { path: 'Pipeline', component: PipelinesMainComponent },
      { path: 'Reports', component: ReportsMainComponent,
        children: [
          { path: 'deal-created-vs-lost', component: DealCreatedVsLostComponent },
          { path: 'churn-overview', component: ChurnOverviewComponent },
          { path: 'revenue-by-month-year-quoter', component: RevenuebyMonthuarterearComponent },
          { path: 'sales-team-permonance', component: SalesTeamPermonanceComponent },
        ] },
      { path: 'events', component: EventsComponent },
      { path: 'quoteslisting', component: QuoteslistingComponent },
      { path: 'userprofile', component: UserProfileComponent },
      { path: 'editquotes/:id', component: QuotesCreateComponent },
      { path: 'quotes-invoice', component: QuotesInvoiceComponent },
      {
        path: 'Settings', component: SettingsMainComponent,
        children: [
          
          { path: 'user-view', component: UserProfileComponent },
          { path: '**', redirectTo: '/CRM/Settings/user-view' }
        ]
      },
      { path: 'Profileview', component: ProfileComponent },
      { path: 'addcontacts', component: AddContactsComponent },
      { path: 'Profileview/:id', component: ProfileComponent },
      { path: '**', redirectTo: '/CRM/Home' }
    ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'Changepassword', component: ChangePasswordComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
