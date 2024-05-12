import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { ToastService } from './toast.service';

import { IAssessment } from 'app/interfaces/IAssessment';
import { AuthService } from './auth.service';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  #url    = signal<string>(environment.API+"/posts");  
  #http   = inject(HttpClient); 
  #auth   = inject(AuthService);
  #toast  = inject(ToastService); 
  
  public headers: HttpHeaders | undefined;

  constructor() {
    this.#auth.reloadHeaders();
    this.headers = this.#auth.headers;
  }

  #idPost = signal<string>("");
  get idPost(){
    return this.#idPost.asReadonly();
  }

  public httpPost$(assessment: IAssessment): Observable<any>{
    return this.#http.post<any>(`${this.#url()}`, assessment, { headers: this.headers }).pipe(
      tap(res => { 
        this.#idPost.set(res.id);
        this.showMessage(res.status, res.message)

      }),

      catchError((error: HttpErrorResponse)=>{
        
        if(error.status == 422){
          this.#toast.error(error.error.message)
        }

        return throwError(()=> error.error)
      })
    );
  }


  // #statusUpload = signal<boolean | null>(null);
  // public get statusUpload(){
  //   return this.#statusUpload.asReadonly();
  // }

  // #messageUpload = signal<string>("");
  // public get messageUpload(){
  //   return this.#statusUpload.asReadonly();
  // }

  public upload$(data: any){
    return this.#http.post<any>(`${this.#url()}/image`, data).pipe(
      tap((res) => {

        console.log(res);
        // this.#statusUpload.set(res.status);
        // this.#messageUpload.set(res.body);
      }),
      catchError((error: HttpErrorResponse)=>{
        console.log(error);

        if(error.status == 422){
          this.#toast.error(error.error.message)
        }

        return throwError(()=>error)
      })
    )
  }

  private showMessage(status: boolean, message: string){

    if(status == true){
      this.#toast.success(message);

    } else{
      this.#toast.error(message);
    }

  }

}
