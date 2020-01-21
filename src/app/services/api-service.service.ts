import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Details} from '../details';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient) { }

  url = "https://jsonplaceholder.typicode.com/users"

  getData():Observable<any>{
    return this.http.get(`${this.url}`,httpOptions)
  }

  createData(detail: any): Observable<any>{
    return this.http.post<any>(`${this.url}`,detail,httpOptions)
  }

  deleteData(id: any): Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`,httpOptions)
  }

  updateData(detail: any,id: any): Observable<any>{
    return this.http.put<any>(`${this.url}/${id}`,detail,httpOptions)
  }
}
