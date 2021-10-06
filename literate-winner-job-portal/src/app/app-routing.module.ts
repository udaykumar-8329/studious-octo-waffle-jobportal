import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { ViewComponent } from './application/view/view.component';
import { AddComponent } from './jobs/add/add.component';
import { JobsComponent } from './jobs/jobs.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [{
  path: 'job/add', component: AddComponent
},{
  path: 'jobs', component: JobsComponent
},{
  path: 'upload', component: ApplicationComponent
},{
  path:'applications', component: ViewComponent
},{
  path:'home', component: LandingPageComponent
},{
  path:'', redirectTo:'home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
