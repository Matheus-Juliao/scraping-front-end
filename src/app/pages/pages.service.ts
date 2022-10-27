import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private url: string = "http://localhost:3000/"

  constructor(private http:HttpClient) { }

  public postForm(payload: string): Observable<any> {
    return this.http.post<any>(`${this.url}fipe`, payload).pipe(
      res => res
    )
  }

  public postBrand(brand: string): Observable<any> {
    return this.http.post<any>(`${this.url}brand`, brand).pipe(
      res => res
    )
  }

  public postModelYear(modelYear: string): Observable<any> {
    return this.http.post<any>(`${this.url}modelyear`, modelYear).pipe(
      res => res
    )
  }
  
}
