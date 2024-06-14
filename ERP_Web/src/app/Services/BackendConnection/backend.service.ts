import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { API_URL } from '../../utility/constants';


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private baseUrl = API_URL; 

  constructor(private http: HttpClient) {}
  

  getapi(url:any): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`);
  }

  postapi(url: any,body:any): Observable<any> {
    return this.http.post(`${this.baseUrl}${url}`, body);
  }
  putapi(url: any,body:any): Observable<any> {
    return this.http.put(`${this.baseUrl}${url}`, body);
  }
  deleteapi(url: any,): Observable<any> {
    return this.http.delete(`${this.baseUrl}${url}`);
  }
}
