import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './loginPages/login-page/login-page.component';
import { SignUpComponent } from './loginPages/sign-up/sign-up.component';
import { CRMRoutingModule } from './crm/crm-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpComponent
  ],
  imports: [
    AppRoutingModule,
    CRMRoutingModule
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
