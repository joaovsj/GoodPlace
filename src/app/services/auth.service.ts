import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);
  #url  = signal<string>(environment.API + "/register");  
  public headers: HttpHeaders | undefined;
  
  constructor(){
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }

  public httpPostUser(user: any): Observable<any>{
    return this.#http.post<any>(this.#url(), {...user}, { headers: this.headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(()=> error.error) 
      })
    );
  }
}
