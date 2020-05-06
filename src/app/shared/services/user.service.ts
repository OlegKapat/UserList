import { Injectable} from '@angular/core';
import {Content} from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService   {
  private baseUrl='http://localhost:3000/content';
  constructor(private http:HttpClient) {}
 
  getUser():Observable<Content>{
   return this.http.get<Content>(this.baseUrl)
  }
  setUser(data:any={}):Observable<Content>{
    return this.http.post<Content>(this.baseUrl,data)
  }
}
