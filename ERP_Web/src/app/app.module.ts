import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampaignListComponent } from './CRM/Campaign/campaign-list/campaign-list.component';
import { CompaniesListComponent } from './CRM/Companies/companies-list/companies-list.component';
import { ContactsListComponent } from './CRM/Contacts/contacts-list/contacts-list.component';
import { LeadListComponent } from './CRM/Lead/lead-list/lead-list.component';
import { QuotationListComponent } from './CRM/Quotation/quotation-list/quotation-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CampaignListComponent,
    CompaniesListComponent,
    ContactsListComponent,
    LeadListComponent,
    QuotationListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
