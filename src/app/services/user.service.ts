import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, pipe, tap, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { IUser } from 'app/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  #http  = inject(HttpClient);
  #auth  = inject(AuthService);
  #url   = signal<String>(environment.API+"/user");
  public headers: HttpHeaders | undefined;

  constructor() {
    this.headers = this.#auth.headers;
  }

  
  //  USER
  #setUserId = signal<IUser | null>(null);
  public get userId(){
    return this.#setUserId;
  }

  // ERROR  
  #setErrorUserId  = signal<any>(null);
  public get getErrorUserId(){
  return this.#setErrorUserId.asReadonly();
  }

  public getUser$(id: String): Observable<IUser>{
    return this.#http.get<IUser>(`${this.#url()}/${id}`, { headers: this.headers }).pipe(

      tap((res: any)=>this.#setUserId.set(res.body)),
      catchError((error: HttpErrorResponse)=>{

        this.#setErrorUserId.set(error.error);
        return throwError(()=> error);
      })
    );
  }

  #icons = signal(null);
  public get getIcons(){
    return this.#icons.asReadonly();
  }

  public getIcons$(): Observable<any>{
    return this.#http.get<any>(`${environment.API+"/icons"}`, { headers: this.headers }).pipe(
      tap((res)=>this.#icons.set(res))
    );
  }


  #statusUpdate = signal<boolean>(true);
  public get statusUpdate(){
    return this.#statusUpdate.asReadonly();
  }

  #messageUpdate = signal<String | null>(null);
  public get messageUpdate(){
    return this.#messageUpdate.asReadonly();
  }


  public update$(id: any, user: any):Observable<any>{

    return this.#http.put<any>(`${this.#url()}/${id}`, user, { headers: this.headers }).pipe(
      tap((res: any) => {

        console.log(res);
        this.#statusUpdate.set(res.status);
        this.#messageUpdate.set(res.message);
      }, 
      catchError((err: HttpErrorResponse)=>{ 
      
        console.log(err);

        return throwError(()=>err)
      })
      )
    );
  }

}
