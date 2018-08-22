
import { map } from 'rxjs/operators';
import { Injectable, ElementRef, Component } from '@angular/core';
import { Employee } from './employee';
import { Country } from '../country';
import { State } from '../state';
import { Response } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Globals } from '../globals';

@Injectable()
export class EmployeeService {


    constructor(private http: HttpClient,
        private el: ElementRef,
        private global: Globals) { }


    getEmployeeDB() {
        return this.http.get<Employee[]>(this.global.apiUrl + "/employees")
            .pipe(catchError(this.errorHandler));

        ////Used in Angular 5
        // return this.http.get(this.global.apiUrl + "/employees").pipe(
        //     map((res: Response) => res.json()));
        ////End
    }

    getEmployeeByEmpIdDB(Id: number) {
        //return this.http.get(this.global.apiUrl + "/employees/:EmpId", { params: { EmpId: Id } }) //For NodeJs API

        return this.http.get<Employee[]>(this.global.apiUrl + "/employees/" + Id)
            .pipe(catchError(this.errorHandler));

        ////Used in Angular 5
        // return this.http.get(this.global.apiUrl + "/employees/" + Id).pipe(
        //     map((res: Response) => res.json()));
        ////End
    }

    deleteEmployeeByEmpIdDB(Id: number) {
        //return this.http.delete(this.global.apiUrl + "/employees/:EmpId", { params: { EmpId: Id } }) //For NodeJs API

        return this.http.delete<number>(this.global.apiUrl + "/employees/" + Id)
            .pipe(catchError(this.errorHandler));

        ////Used in Angular 5
        // return this.http.delete(this.global.apiUrl + "/employees/" + Id).pipe(
        //     map((res: Response) => res.json()));
        ////End
    }

    insertEmployeeDB(employee: Employee) {
        //var formData = new FormData();

        // var body = {
        //     Name: employee.Name,
        //     Email: employee.Email,
        //     Age: employee.Age,
        //     CountryId: employee.CountryId,
        //     StateId: employee.StateId,
        //     City: employee.City,
        //     ZipCode: employee.ZipCode,
        //     Mobile: employee.Mobile,
        //     Gender: employee.Gender,
        //     IsMarried: employee.IsMarried,
        //     DOB: employee.DOB,
        //     EmpImage: employee.EmpImage
        // }

        // formData.append('Name', employee.Name);
        // formData.append('Email', employee.Email);
        // formData.append('Age', employee.Age.toString());
        // formData.append('CountryId',employee.CountryId);
        // formData.append('StateId') = req.body.params.emp.StateId;
        // formData.append('City') = req.body.params.emp.City;
        // formData.append('ZipCode') = req.body.params.emp.ZipCode;
        // formData.append('Mobile') = req.body.params.emp.Mobile;
        // formData.append('Gender') = req.body.params.emp.Gender;
        // formData.append('IsMarried = req.body.params.emp.IsMarried;
        // formData.append('DOB = new Date(req.body.params.emp.DOB);
        // formData.append('EmpImage = req.body.params.emp.EmpImage;
        //return this.http.post(this.global.apiUrl + "/employees", { params: { emp: employee } }) // For NodeJs API

        return this.http.post<number>(this.global.apiUrl + "/Employees", employee)
            .pipe(catchError(this.errorHandler));

        ////Used in Angular 5
        // return this.http.post(this.global.apiUrl + "/Employees", employee).pipe(
        //     map((res: Response) => res.json()));
        ////End
    }

    sendEmail(employee: Employee) {
        //return this.http.post(this.global.apiUrl + "/SendEmail", { params: { emp: employee } }) //For NodeJs API

        return this.http.post<string>(this.global.apiUrl + "/SendEmail", employee)
            .pipe(catchError(this.errorHandler));

        ////Used in Angular 5
        // return this.http.post(this.global.apiUrl + "/SendEmail", employee).pipe(
        //     map((res: Response) => res.json()));
        ////End
    }

    updateEmployeeDB(employee: Employee) {
        var body = {
            EmpId: employee.EmpId,
            Name: employee.Name,
            Email: employee.Email,
            Age: employee.Age,
            CountryId: employee.CountryId,
            StateId: employee.StateId,
            City: employee.City,
            ZipCode: employee.ZipCode,
            Mobile: employee.Mobile,
            Gender: employee.Gender,
            IsMarried: employee.IsMarried,
            DOB: employee.DOB,
            EmpImage: employee.EmpImage
        }
        //return this.http.put(this.global.apiUrl + "/employees", { params: { emp: employee } }) // For NodeJs API

        return this.http.put<number>(this.global.apiUrl + "/Employees", body)
            .pipe(catchError(this.errorHandler));

        ////Used in Angular 5
        // return this.http.put(this.global.apiUrl + "/Employees", body).pipe(
        //     map((res: Response) => res.json()));
        ////End
    }

    uploadImage() {
        debugger
        //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        //create a new fromdata instance
        let formData = new FormData();
        //check if the filecount is greater than zero, to be sure a file was selected.
        //append the key name 'photo' with the first file in the element
        formData.append('photo', inputEl.files.item(0));
        //call the angular http method

        return this.http.post<string>(this.global.apiUrl + "/Upload", formData)
            .pipe(catchError(this.errorHandler));

        ////Used in Angular 5
        // return this.http
        //     //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
        //     .post(this.global.apiUrl + "/Upload", formData).pipe(
        //         map((res: Response) => res.json()));
        ////End

    }

    getAllCountry() {

        return this.http.get<Country[]>(this.global.apiUrl + "/getAllCountry")
            .pipe(catchError(this.errorHandler));

        ////Used in Angular 5
        // return this.http.get(this.global.apiUrl + "/getAllCountry").pipe(
        //     //.map((res: Response) => alert(res.json()));
        //     map((res: Response) => res.json()));
        ////End
    }

    getStateByCountry(Id: number) {
        //return this.http.get(this.global.apiUrl + "/getStateByCountry/:CountryId", { params: { CountryId: Id } }) //For NodeJs API

        return this.http.get<State[]>(this.global.apiUrl + "/getStateByCountry/" + Id)
            .pipe(catchError(this.errorHandler));

        ////Used in Angular 5
        // return this.http.get(this.global.apiUrl + "/getStateByCountry/" + Id).pipe(
        //     map((res: Response) => res.json()));
        ////End
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error);
    }
}
