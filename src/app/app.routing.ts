import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeComponent } from './employee/employee.component'
import { CustomerComponent } from './customer/customer.component'; 

let appRoutes: Routes = [
  { path: 'employeePage', component: EmployeeComponent },
  { path: 'customerPage', component: CustomerComponent },
  { path: '', component: EmployeeComponent, pathMatch: 'full'} // redirect to home page on load
];

export let routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);