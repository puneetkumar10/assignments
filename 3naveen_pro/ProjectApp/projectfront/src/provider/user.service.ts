import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { EndPointService } from "./endpoint.service";
import { Observable } from "rxjs/Observable";
@Injectable()
export class UserService {

    constructor(private http: HttpClient,
        private endPoints: EndPointService
    ) { }

    registerUser(data): Observable<any> {
        return this.http.post(`${this.endPoints.url}/createuser`, data);
    }

    loginUser(data): Observable<any> {
        return this.http.post(`${this.endPoints.url}/login`, data);
    }
}