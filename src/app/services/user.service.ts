import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, pipe, tap, throwError } from 'rxjs';

import { AuthService } from './auth.service';
import { IUser } from 'app/interfaces/IUser';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  #http  = inject(HttpClient);
  #auth  = inject(AuthService);
  #url   = signal<String>(environment.API);
  #toast = inject(ToastService)

  public headers: HttpHeaders | undefined;

  constructor() {
    
    this.#auth.reloadHeaders();
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
    return this.#http.get<IUser>(`${this.#url()}/user/${id}`, { headers: this.headers }).pipe(

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

    return this.#http.put<any>(`${this.#url()}/user/${id}`, user, { headers: this.headers }).pipe(
      tap((res: any) => {
        this.#statusUpdate.set(res.status);
        this.#messageUpdate.set(res.message);
      }, 
      catchError((err: HttpErrorResponse)=>{ 
        return throwError(()=>err)
      })
      )
    );
  }

  #statusUpload = signal<boolean | null>(null);
  public get statusUpload(){
    return this.#statusUpload.asReadonly();
  }

  #messageUpload = signal<string>("");
  public get messageUpload(){
    return this.#statusUpload.asReadonly();
  }

  

  public upload$(data: any){

    console.log(data);

    return this.#http.post<any>(`${this.#url()}/user/image`, data, { headers: this.headers }).pipe(
      tap((res) => {

        console.log(res)

        this.#statusUpload.set(res.status);
        this.#messageUpload.set(res.body);
      }),
      catchError((error: HttpErrorResponse)=>{

        console.log(error)

        if(error.status == 422){
          this.#toast.error(error.error.message)
        }

        return throwError(()=>error)
      })
    )
  }


  #categories = signal<any>([]);
  public get categories(){
    return this.#categories.asReadonly();
  }
  public getCategories$(){
    return this.#http.get<any>(`${this.#url()}/categories`, { headers: this.headers }).pipe(
      tap(res=> this.#categories.set(res.body))
    );
  }

  public getAddress$(cep: String){
    return this.#http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }


}
