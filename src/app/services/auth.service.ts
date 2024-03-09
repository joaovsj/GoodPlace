import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);
  #url  = signal<string>(environment.API + "/");  
  
  
  constructor(){
    console.log(this.#url());
  }

  public httpPostUser(user: any): Observable<any>{
    
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    // console.log(headers);
    return this.#http.post<any>(this.#url(), { user }, { headers: headers });
  }


  public teste(){

    console.log('aq');

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.#http.get<any>("http://localhost:8000/api/")
    .pipe(
      tap(res => console.log(res))
    );
  }
}
