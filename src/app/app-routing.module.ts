import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';

const appRoutes: Routes = [
    {path: '', component: DashboardComponent },
    {path: 'reports', component: ReportsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
