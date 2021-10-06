import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidateRegistrationComponent } from './auth/registration/candidate/candidate.component';
import { CandidateLoginComponent } from './auth/login/candidate/candidate.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { JobsComponent } from './jobs/jobs.component';
import { AddComponent } from './jobs/add/add.component';
import { ApplicationComponent } from './application/application.component';
import { ViewComponent } from './application/view/view.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AuthInterceptor } from './services/AuthInterceptor.service';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateRegistrationComponent,
    CandidateLoginComponent,
    JobsComponent,
    AddComponent,
    ApplicationComponent,
    ViewComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgHttpLoaderModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
