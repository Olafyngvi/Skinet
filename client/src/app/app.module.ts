import { NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { SuccessfulComponent } from './contact/successful.component';
import { ServisComponent } from './servis/servis.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line: import-spacing
import {  AuthServiceConfig } from 'angularx-social-login';
// tslint:disable-next-line: import-spacing
import { SocialLoginModule, GoogleLoginProvider, }  from 'angularx-social-login';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('76633181732-ubtdsfc3gvod8v643t1t57n0duqgmqgc.apps.googleusercontent.com')
  }
]);
// tslint:disable-next-line: typedef
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    SuccessfulComponent,
    ServisComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    NgxSpinnerModule,
    CommonModule,
    NgbModule,
    SocialLoginModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {provide: AuthServiceConfig,
    useFactory: provideConfig},
    Meta

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
