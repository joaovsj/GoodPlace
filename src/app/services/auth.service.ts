import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http   = inject(HttpClient);
  #router = inject(Router);
  #url    = signal<string>(environment.API);  
  #cookie = inject(CookieService); 
  public headers: HttpHeaders | undefined;

  #errorsRegister = signal<[{}] | any>(null);
  public get errorRegister(){
    return this.#errorsRegister.asReadonly();
  }  
  
  constructor(){
    this.reloadHeaders();
  }

  public reloadHeaders(){

    const token = this.#cookie.get('token');

    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);;

  }



  public register(user: any): Observable<any>{
    return this.#http.post<any>(`${this.#url()}/register`, {...user}, { headers: this.headers }).pipe(
      catchError((error: HttpErrorResponse) => {

        const code  = error.status;
        var msg   = "";

        if(code == 0){
          msg = "Erro ao conectar com o servidor!";

        }else{
          msg = error.error.errors;
        }

        this.#errorsRegister.set({code: code, messages: msg})
        return throwError(()=> error.error)
      })
    );
  }



  #errorlogin = signal<any>(null);
  
  public get errorLogin(){
    return this.#errorlogin.asReadonly();
  }
  
  #serverIsDown = signal<any>(false);
  public get serverIsdown(){
    return this.#serverIsDown.asReadonly();
  }

  public login(user: object): Observable<any>{
    return this.#http.post<any>(`${this.#url()}/login`, {...user}, { headers: this.headers }).pipe(
      catchError((error: HttpErrorResponse) => {

        this.#serverIsDown.set(false);
        
        if(error.status === 0){
          this.#serverIsDown.set(true);
        }
      
        this.#errorlogin.set(error.error.errors);         
        return throwError(()=>error);
      })
    );
  }

  public logged$(){
    return this.#http.get<any>(`${this.#url()}/logged`, { headers: this.headers }).pipe(
      tap(res=> console.log(res)),
      catchError((error: HttpErrorResponse) => {
        if(error.status == 401){
          this.#router.navigate(['login'])
        }

        return throwError(()=>error);
      })
    );
  }


}
