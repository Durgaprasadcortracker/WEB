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
import { ConfigrationComponent } from './CRM_Module/Settings/Configration/configration/configration.component';
import { UserProfileComponent } from './CRM_Module/Settings/user-profile/user-profile.component';
import { StatusdesignComponent } from './CRM_Module/Settings/Configration/statusdesign/statusdesign.component';
import { StagedesignComponent } from './CRM_Module/Settings/Configration/stagedesign/stagedesign.component';
import { SourcedesignComponent } from './CRM_Module/Settings/Configration/sourcedesign/sourcedesign.component';
import { TimezoneComponent } from './CRM_Module/Settings/Configration/timezone/timezone.component';
import { CityComponent } from './CRM_Module/Settings/Configration/city/city.component';
import { IndustryComponent } from './CRM_Module/Settings/Configration/industry/industry.component';
import { QuotesCreateComponent } from './CRM_Module/Companies/Contacts/quotes/quotes-create/quotes-create.component';
import { EventsComponent } from './CRM_Module/Leads/events/events.component';
import { ProbabilityComponent } from './CRM_Module/Settings/Configration/probability/probability.component';
import { StateComponent } from './CRM_Module/Settings/Configration/state/state.component';
import { CompaniesInfoComponent } from './CRM_Module/Companies/companies-info/companies-info.component';
import { AddEmailConversationComponent } from './CRM_Module/Campagins/add-email-conversation/add-email-conversation.component';
import { CampaginsComponent } from './CRM_Module/Campagins/Campagins-View/campagins/campagins.component';
import { EmailCampaginsComponent } from './CRM_Module/Campagins/Campagins-View/email-campagins/email-campagins.component';
import { SocialMediaCampaginsComponent } from './CRM_Module/Campagins/Campagins-View/social-media-campagins/social-media-campagins.component';
import { SmsCampaginsComponent } from './CRM_Module/Campagins/Campagins-View/sms-campagins/sms-campagins.component';
import { QuoteslistingComponent } from './CRM_Module/Companies/Contacts/quotes/quoteslisting/quoteslisting.component';
import { QuotesInvoiceComponent } from './CRM_Module/Companies/Contacts/quotes/quotes-invoice/quotes-invoice.component';
import { CountryComponent } from './CRM_Module/Settings/Configration/country/country.component';
import { IndustrytypeComponent } from './CRM_Module/Settings/Configration/industrytype/industrytype.component';
import { CalltypeComponent } from './CRM_Module/Settings/Configration/calltype/calltype.component';
import { QuotetypeComponent } from './CRM_Module/Settings/Configration/quotetype/quotetype.component';
import { AddCampaginComponent } from './CRM_Module/Campagins/add-campagin/add-campagin.component';
import { AddLeadsComponent } from './CRM_module/leads/add-leads/add-leads.component';
import { CompainesRouteComponent } from './CRM_Module/Companies/compaines-route/compaines-route.component';
import { LeadsRouterComponent } from './CRM_Module/Leads/leads-router/leads-router.component';
import { CampaginsRouteComponent } from './CRM_Module/Campagins/campagins-route/campagins-route.component';



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
          { path: 'companiesinfo/:id', component: CompaniesInfoComponent,
            children: [
              { path: 'profile/:id', component: ProfileComponent },
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
      { path: 'add-contacts', component: AddContactsComponent },
      { path: 'edit-contacts/:id', component: AddContactsComponent },
      // { path: 'Leads', component: LeadsMainComponent },
      // { path: 'add-leads', component: AddLeadsComponent },
      // { path: 'contacts', component: ContactsMainComponent },
      { path: 'Leads', component: LeadsMainComponent },
      { path: 'add-leads', component: AddLeadsComponent },
      { path: 'edit-leads/:id', component: AddLeadsComponent },
      // { path: 'Campagins', component: CampaginsMainComponent },

      { path: 'Pipeline', component: PipelinesMainComponent },
      { path: 'Reports', component: ReportsMainComponent },
      { path: 'events', component: EventsComponent },
      { path: 'quoteslisting', component: QuoteslistingComponent },
      { path: 'userprofile', component: UserProfileComponent },
      { path: 'quotes-create', component: QuotesCreateComponent },
      { path: 'editquotes/:id', component: QuotesCreateComponent },
      { path: 'quotes-invoice', component: QuotesInvoiceComponent },
      {
        path: 'Settings', component: SettingsMainComponent,
        children: [
          { path: 'status', component: StatusdesignComponent },
          { path: 'stage', component: StagedesignComponent },
          { path: 'source', component: SourcedesignComponent },
          { path: 'time-zone', component: TimezoneComponent },
          { path: 'city', component: CityComponent },
          { path: 'industry', component: IndustryComponent },
          { path: 'probability', component: ProbabilityComponent },
          { path: 'state', component: StateComponent },
          { path: 'country', component: CountryComponent },
          { path: 'industry-type', component: IndustrytypeComponent },
          { path: 'call-type', component: CalltypeComponent },
          { path: 'quote-type', component: QuotetypeComponent },
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
