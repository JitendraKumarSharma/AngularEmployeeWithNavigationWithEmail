import { Injectable } from '@angular/core';

//@Injectable()
export class Globals {

    //For ASP.Net WebAPI
    apiUrl: string = "http://localhost:2321/api";
    imageUrl: string = "http://localhost:2321/UploadFile";

    ////For NodeJs API
    // apiUrl: string = "http://localhost:3001/api";
    // imageUrl: string = "http://localhost:3001";

    // apiUrl: string = "http://192.168.1.134:3001/api";    
    // imageUrl: string = "http://192.168.1.134:3001";


    // apiUrl: string = "https://my-angular-project-e5be3.firebaseapp.com/api";
    // imageUrl: string = "https://my-angular-project-e5be3.firebaseapp.com";

}