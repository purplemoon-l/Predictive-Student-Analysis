import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { ProfileComponent } from './views/profile/profile.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { StudentsListComponent } from './views/students-list/students-list.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { ProgressBarCircleComponent } from './components/progress-bar-circle/progress-bar-circle.component';
import { NotificationsService } from 'angular2-notifications';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HttpService } from './services/http/http.services';
import { FormsModule } from '@angular/forms';
const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'app', component: LayoutComponent, children:
      [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'dashboard/:role/:id', component: DashboardComponent },
    //    { path: 'profile', component: ProfileComponent },
        { path: 'profile/:role/:id', component: ProfileComponent },
        { path: 'students-list', component: StudentsListComponent },
        { path: 'students-list/:role/:id', component: StudentsListComponent },
        { path: 'profile/:role/:id/:teacherId', component: ProfileComponent },
      ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LayoutComponent,
    LoginComponent,
    DashboardComponent,
    StudentsListComponent,
    DashboardChartComponent,
    ProgressBarCircleComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ChartModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule],
  providers: [
    HttpService,
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
