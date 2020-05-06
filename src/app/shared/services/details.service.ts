import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Statictic } from '../interfaces/statictic';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private baseUrl='http://localhost:3000/statistics';
  constructor(private http:HttpClient) { }
  getData():Observable<Statictic[]>{
    return this.http.get<Statictic[]>(this.baseUrl)
   }
}
