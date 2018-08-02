import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit, NgModule, VERSION } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeService } from './employee/employee.service';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { CustomerComponent } from './customer/customer.component';
import { routing }  from './app.routing';
@NgModule({
    declarations: [
        AppComponent,
        EmployeeComponent,
        FieldErrorDisplayComponent,
        CustomerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        HttpModule,
        routing 
    ],
    providers: [NgbActiveModal],
    bootstrap: [AppComponent]
})
export class AppModule { }
