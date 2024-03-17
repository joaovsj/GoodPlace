import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #http = inject(HttpClient);
  #url  = signal<string>(environment.API + "/register");  
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

  public httpPostUser(user: any): Observable<any>{
    return this.#http.post<any>(this.#url(), {...user}, { headers: this.headers }).pipe(
      catchError((error: HttpErrorResponse) => {

        const code  = error.status;
        var msg   = "";

        if(code == 0){
          msg = "Erro ao conectar com o servidor!";

        }else{
          msg = error.error.errors;
        }

        // const messages = error.errors.errors 
        this.#errorsRegister.set({code: code, messages: msg})

        // if(error.status == 0){
        //   return throwError(()=> 'Erro ao conectar com o servidor!')   
        // }

        // console.log(error.error);
        
        // this.#errorsRegister.set(error.error.errors);
        return throwError(()=> error.error)
      })
    );
  }
}
