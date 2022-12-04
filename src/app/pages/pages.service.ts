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

  public postPeriod(period: string): Observable<any> {
    return this.http.post<any>(`${this.url}period`, period).pipe(
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

  public postPrint(payload: string): Observable<any> {
    return this.http.post<any>(`${this.url}print`, payload).pipe(
      res => res
    )
  }

  public postPrintView(endPoint: string): Observable<any> {
    return this.http.post<any>(`${this.url}${endPoint}`, null).pipe(
      res => res
    )
  }

  public postMoreExpensive(): Observable<any> {
    return this.http.post<any>(`${this.url}moreExpensive`, null).pipe(
      res => res
    )
  }

  public postCheapest(): Observable<any> {
    return this.http.post<any>(`${this.url}cheapest`, null).pipe(
      res => res
    )
  }

  public postLessPowerful(): Observable<any> {
    return this.http.post<any>(`${this.url}lessPowerful`, null).pipe(
      res => res
    )
  }

  public postMoreEconomical(): Observable<any> {
    return this.http.post<any>(`${this.url}moreEconomical`, null).pipe(
      res => res
    )
  }

  public postLessEconomical(): Observable<any> {
    return this.http.post<any>(`${this.url}lessEconomical`, null).pipe(
      res => res
    )
  }
  
}
