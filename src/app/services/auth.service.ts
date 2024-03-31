import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);
  #url  = signal<string>(environment.API);  
  public headers: HttpHeaders | undefined;

  #errorsRegister = signal<[{}] | any>(null);
  public get errorRegister(){
    return this.#errorsRegister.asReadonly();
  }  
  
  constructor(){
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
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

        console.log(error.ok);
      
        this.#errorlogin.set(error.error.errors); 
        
        return throwError(()=>error);
      })
    );
  }


}
