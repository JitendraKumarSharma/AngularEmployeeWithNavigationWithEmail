import { Injectable, Component, OnInit, Input, Directive, EventEmitter, Output, HostListener, HostBinding, ElementRef, Renderer, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal, NgbInputDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import * as $ from 'jquery';
import 'datatables.net';
import { TemplateRef } from '@angular/core/src/linker/template_ref';
import { isObject, debuglog } from 'util';
import { Http, Response } from '@angular/http';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
import { promise } from 'selenium-webdriver';

import { Globals } from '../globals';
import { Country } from '../Country';
import { State } from '../state';
//import "../../assets/js/employee.js";

declare const myExtObject: any;

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css'],
    providers: [EmployeeService, Globals]
})

@Directive({
    selector: '[clickOutside]'
})


export class EmployeeComponent implements OnInit {

    constructor(
        public employeeService: EmployeeService,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        public activeModal: NgbActiveModal,
        private el: ElementRef,
        private renderer: Renderer,
        private http: Http,
        private global: Globals
    ) {
    }

    //@HostBinding('class.card-outline-primary') private ishovering: boolean;

    // @HostListener('mouseout') onMouseOut() {
    //     let part = this.el.nativeElement.querySelector('.dropdown-menu');
    //     this.renderer.setElementStyle(part, 'display', 'none');
    //     this.ishovering = false;
    // }

    // @HostListener('click', ['$event.target']) onclick() {
    //     let part = this.el.nativeElement.querySelector('.dropdown-menu');
    //     this.renderer.setElementStyle(part, 'display', 'block');
    //     this.ishovering = false;
    // }


    //Set Focus on specific control on startup
    @ViewChild("empname") el1: ElementRef;
    set empname(_input: ElementRef | undefined) {
        if (_input !== undefined) {
            setTimeout(() => { //This setTimeout call may not be necessary anymore.
                _input.nativeElement.focus();
            }, 0);
        }
    }
    //////////////////////

    @Output()
    public clickOutside = new EventEmitter();

    // Code to find the target element
    // @HostListener('window:click', ['$event.target'])
    // public onClick(targetElement) {
    //     
    //     const clickedInside = this.el.nativeElement.contains(targetElement);
    //     if (!clickedInside) {
    //         this.clickOutside.emit(null);
    //     }
    // }

    //Get the key pressed on window
    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        console.log(event);
        let x = event.keyCode;
        if (x === 27) {
            console.log('Escape!');
        }
    }

    // @HostListener('click') onclick() {
    //     let part = this.el.nativeElement.querySelector('.dropdown-menu');
    //     this.renderer.setElementStyle(part, 'display', 'block');
    // }

    // @HostListener('window:click', ['$event'])
    // MouseEvent(event: MouseEvent) {
    //     let part = this.el.nativeElement.querySelector('.dropdown-menu');
    //     this.renderer.setElementStyle(part, 'display', 'block');
    //     this.ishovering = false;
    // }

    //closeResult: string;
    modalOption: NgbModalOptions = {};
    modalReference: any;
    form: FormGroup;

    //declare model variable
    Id_M: number;
    Name_M: string;
    Email_M: string;
    Age_M: number;
    City_M: string;
    ZipCode_M: string;
    Mobile_M: string;
    Gender_M: string;
    IsMarried_M: boolean = false;
    DOB_M: NgbDateStruct;
    employees: Employee[];
    totalEmployee: number;
    empDelArr: Employee[] = [];
    empDel: Employee;
    cnt: number = 0;
    flag: number;
    public tableWidget: any;
    users: Array<any>;
    empImage: string = "blank.png";
    url: string = this.global.imageUrl;
    countryList: Country[];
    stateList: State[];
    country_M: number;
    state_M: number;
    src: string;

    ngAfterViewInit() {
        this.getAllCountry();
        this.global.apiUrl;
        this.getAllEmployee();
        //set focus on start on empname
        //this.el1.nativeElement.focus();
    }

    public getAllCountry() {
        this.employeeService.getAllCountry()
            .subscribe(
                data => {
                    //this.countryList = data[0]; //For NodeJs API
                    this.countryList = data;
                    this.country_M = this.countryList[0].CountryId;
                    this.getStateByCountry();
                });
    }

    public getStateByCountry() {
        if (this.country_M != null && this.country_M.toString() != "") {
            this.employeeService.getStateByCountry(this.country_M)
                .subscribe(
                    data => {
                        this.stateList = data;
                        this.state_M = this.stateList[0].StateId;
                    });
        }
    }

    private initDatatable(): void {
        const exampleId: any = $('#example');
        this.tableWidget = exampleId.DataTable({
            select: true
        });
    }

    private reInitDatatable(): void {
        if (this.tableWidget) {
            this.tableWidget.destroy();
            this.tableWidget = null;
        }
        setTimeout(() => this.initDatatable(), 10);
    }

    public deleteRow(): void {
        this.employees.pop();
        this.reInitDatatable();
    }

    public getAllEmployee() {
        this.employeeService.getEmployeeDB()
            .subscribe(
                data => {
                    //this.employees = data[0]; //For NodeJs API
                    this.employees = data;
                    this.reInitDatatable();
                });
    }

    public createEmployee() {
        //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        //create a new fromdata instance
        let formData = new FormData();
        var self = this;
        if (fileCount > 0) {
            //Check File Extention        
            let filename: string = inputEl.files[0].name;
            let splitlength: number = (inputEl.files[0].name).split('.').length;
            let ext: string = (inputEl.files[0].name).split('.')[splitlength - 1];
            if (ext.toLowerCase() == "jpg" || ext.toLowerCase() == "png") {
                var promoise = new Promise(function (resolve, reject) {
                    self.employeeService.uploadImage().subscribe(
                        data => {
                            resolve(data);
                        }
                    );
                });
                var pic;
                promoise.then(function (res) {
                    pic = res;
                    self.empImage = pic;
                    inputEl.value = "";
                    self.EmployeeAction("Insert");
                });

            }
            else {
                alert("Please select image file!!");
            }
        }
        else {
            inputEl.value = "";
            self.EmployeeAction("Insert");
        }
    }

    //Code to enter only number
    keyPress(event: any) {
        //const pattern = /[0-9\+\-\ ]/;// Number with + and - sign
        const pattern = /[0-9]/; // Only Numbers

        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    ////////////////////

    ngOnInit() {
        this.form = this.formBuilder.group({
            EmployeeName: [null, [Validators.required]],
            Email: [null, [Validators.required, Validators.email]],
            Age: [null, Validators.required],
            CountryId: ['', Validators.required],
            StateId: ['', Validators.required],
            City: [null, Validators.required],
            ZipCode: [null, Validators.required],
            Mobile: [null, Validators.required],
            Gender: [null, Validators.required],
            IsMarried: [null, Validators.nullValidator],
            DOB: [null, Validators.required],
            EmpId: [null, Validators.nullValidator]
        });
    }

    isFieldValid(field: string) {
        return !this.form.get(field).valid && this.form.get(field).touched;
    }

    displayFieldCss(field: string) {
        return {
            'has-error': this.isFieldValid(field),
            'has-feedback': this.isFieldValid(field)
        };
    }

    onSubmit() {

        console.log(this.form);
        if (this.form.valid) {
            if (this.Id_M > 0) {
                this.updateEmployee();
            }
            else {
                this.createEmployee();
            }

            console.log('form submitted');
        } else {
            this.validateAllFormFields(this.form);
        }
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            console.log(field);
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    reset() {
        this.empImage = "blank.png";
        myExtObject.resetImage(this.url, this.empImage);
        this.form.reset();
        this.getAllCountry();
    }

    deleteEmployee() {
        debugger
        if (this.flag == 1) {
            var self = this;
            var promise = new Promise(function (reslove, reject) {
                self.employeeService.deleteEmployeeByEmpIdDB(self.empDel.EmpId)
                    .subscribe(
                        data => {
                            //self.Id_M = data[0];
                            self.Id_M = data; //For NodeJs API
                            reslove(self.Id_M);
                        });
            });
            promise.then(function (res) {
                self.getAllEmployee();
                self.empImage = "blank.png";
                self.reset();
                alert("Employee Deleted Successfully!!");
            });
        }
        else if (this.flag == 0) {
            this.deleteSelectedEmployee();
        }
        this.activeModal.close();
    }

    checkbox(empObj: Employee) {
        if (this.empDelArr.find(x => x == empObj)) {
            this.empDelArr.splice(this.empDelArr.indexOf(empObj), 1)
        }
        else {
            this.empDelArr.push(empObj);
        }
    }

    deleteSelectedEmployee() {
        var self = this;
        var promoise = new Promise(function (resolve, reject) {
            for (self.cnt = 0; self.cnt < self.empDelArr.length; self.cnt++) {
                if (self.employees.find(x => x == self.empDelArr[self.cnt])) {
                    self.employeeService.deleteEmployeeByEmpIdDB(self.empDelArr[self.cnt].EmpId)
                        .subscribe(
                            data => {
                                self.Id_M = data[0].EmpId;
                                resolve(self.Id_M);
                            });
                }
            }
        });
        promoise.then(function (res) {
            self.empDelArr = [];
            self.getAllEmployee();
            self.empImage = "blank.png";
            self.reset();
            alert("Employee Deleted Successfully!!");
        });
    }

    open(content, emp: any) {
        if (isObject(emp)) {
            this.flag = 1;
            this.empDel = emp;
        }
        else {
            this.flag = 0;
        }
        this.modalOption.backdrop = 'static';
        this.modalOption.keyboard = false;
        this.modalService.open(content, this.modalOption).result.then((result) => {
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {

        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    Edit(emp: Employee) {
        //debugger
        this.employeeService.getEmployeeByEmpIdDB(emp.EmpId)
            .subscribe(
                data => {
                    this.empDel = data[0];
                    this.Id_M = this.empDel.EmpId;
                    this.Name_M = this.empDel.Name;
                    this.Email_M = this.empDel.Email;
                    this.Age_M = this.empDel.Age;
                    this.country_M = this.empDel.CountryId;
                    var self = this;
                    var cntry = this.country_M;
                    var promise = new Promise(function (reslove, reject) {
                        self.employeeService.getStateByCountry(cntry)
                            .subscribe(
                                data => {
                                    self.stateList = data;
                                    self.state_M = self.empDel.StateId;
                                });
                    });
                    this.City_M = this.empDel.City;
                    this.ZipCode_M = this.empDel.ZipCode;
                    this.Mobile_M = this.empDel.Mobile;
                    this.Gender_M = this.empDel.Gender;
                    this.IsMarried_M = this.empDel.IsMarried == null ? false : this.empDel.IsMarried;
                    const now = new Date(this.empDel.DOB);
                    this.DOB_M = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
                    this.empImage = this.empDel.EmpImage == "" ? "blank.png" : this.empDel.EmpImage;
                });
    }

    public updateEmployee() {
        //locate the file element meant for the file upload.
        let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');


        //get the total amount of files attached to the file input.
        let fileCount: number = inputEl.files.length;
        //create a new fromdata instance
        let formData = new FormData();
        var self = this;
        if (fileCount > 0) {
            //Check File Extention        
            let filename: string = inputEl.files[0].name;
            let splitlength: number = (inputEl.files[0].name).split('.').length;
            let ext: string = (inputEl.files[0].name).split('.')[splitlength - 1];
            if (ext.toLowerCase() == "jpg" || ext.toLowerCase() == "png") {
                var promoise = new Promise(function (resolve, reject) {
                    self.employeeService.uploadImage().subscribe(
                        data => {
                            resolve(data);
                        }
                    );
                });
                var pic;
                promoise.then(function (res) {
                    pic = res;
                    self.empImage = pic;
                    inputEl.value = "";
                    self.EmployeeAction("Update");
                });

            }
            else {
                alert("Please select image file!!");
            }
        }
        else {
            inputEl.value = "";
            self.EmployeeAction("Update");
        }

    }

    public EmployeeAction(action: string) {
        debugger
        let newEmployee: Employee;
        newEmployee = {
            EmpId: this.Id_M,
            Name: this.Name_M,
            Email: this.Email_M,
            Age: this.Age_M,
            CountryId: this.country_M,
            StateId: this.state_M,
            City: this.City_M,
            ZipCode: this.ZipCode_M,
            Mobile: this.Mobile_M,
            Gender: this.Gender_M,
            IsMarried: this.IsMarried_M == null ? false : this.IsMarried_M,
            DOB: new Date(this.DOB_M.year, this.DOB_M.month - 1, this.DOB_M.day),
            EmpImage: this.empImage == "blank.png" ? "" : this.empImage
        };
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            if (action == "Update") {
                self.employeeService.updateEmployeeDB(newEmployee)
                    .subscribe(
                        data => {
                            //if (data[0][0].EmpId == 0) {
                            if (data == 0) {
                                resolve("Employee Alreay Exists!!");
                            }

                            else {
                                resolve("Employee Updated Successfully!!");
                            }
                        });
            }
            else if (action == "Insert") {
                self.employeeService.insertEmployeeDB(newEmployee)
                    .subscribe(
                        data => {
                            //self.Id_M = data[0][0].EmpId;
                            if (data == 0) {
                                resolve("Employee Alreay Exists!!");
                            }
                            else {
                                // var prms = new Promise(function (reslove, reject) {
                                //     self.employeeService.sendEmail(newEmployee)
                                //         .subscribe(
                                //             data => {
                                //             });
                                // });
                                resolve("Employee Added Successfully!!");
                            }
                        });
            }
        });
        promise.then(function (msg) {
            if (msg != "Employee Alreay Exists!!") {
                self.getAllEmployee();
                self.empImage = "blank.png";
                alert(msg);
                self.reset();
            }
            else {
                alert(msg);
            }
        });
    }
}