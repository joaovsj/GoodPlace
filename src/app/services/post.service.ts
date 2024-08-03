import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';7

import { IAssessment } from 'app/interfaces/IAssessment';
import { AuthService } from './auth.service';

// Services
import { ToastService } from './toast.service';
import { SpinnerService } from './spinner.service';

// Interface
import { IPost } from 'app/interfaces/IPost';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  #url    = signal<string>(environment.API+"/posts");  
  #http   = inject(HttpClient); 
  #auth   = inject(AuthService);
  #toast  = inject(ToastService); 
  #spinner  = inject(SpinnerService);
  #route  = inject(Router);
  
  public headers: HttpHeaders | undefined;

  constructor() {
    this.#auth.reloadHeaders();
    this.headers = this.#auth.headers;
  }

  #allPosts = signal([]);
  public allPosts =  this.#allPosts.asReadonly();
  // get allPosts$(){
  //   return this.#allPosts.asReadonly();
  // } 

  public httpGet$(id: String | any){
    return this.#http.get(`${this.#url()}?user_id=${id}`, { headers: this.headers }).pipe(
      tap((res: any) => {
        if(res.status){
          this.#allPosts.set(res.body);
        }
      })
    );
  }

  #post = signal< IPost | null >(null);
  public post = this.#post.asReadonly();

  public httpGetId$(id: any): Observable<IPost>{
    return this.#http.get(`${this.#url()}/${id}`, { headers: this.headers }).pipe(
      tap((res: any) => {
        console.log(res.body);
        this.#post.set(res.body);
      }),
      catchError((error: HttpErrorResponse)=>{ 
        if(error.status == 404){
          this.#route.navigate(['/explore']);
        }
        return throwError(()=> error.error)
      })
    );
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

  public upload$(data: any){
    return this.#http.post<any>(`${this.#url()}/image`, data).pipe(
      tap((res) => {
        console.log(res);
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


  public httpDelete$(id: number){
    return this.#http.delete(`${this.#url()}/${id}`, { headers: this.headers }).pipe(
      tap((res: any) => {
        if(res){
          this.showMessage(res.status, res.message);
        }
      }),
      catchError((error: HttpErrorResponse)=>{ 
        
        console.log(error);

        return throwError(()=> error.error)
      })
    );
  }


  #postSearch = signal(null);
  public postSearch = this.#postSearch.asReadonly();

  public search$(name: any){
    return this.#http.get(`${this.#url()}/people/${name}`, { headers: this.headers }).pipe(
      tap((res: any)=>{
        if(res.status){
          this.#postSearch.set(res.body);
        }
        this.#spinner.hide();
      }),
      catchError((error: HttpErrorResponse)=>{
        if(error.status === 404){
          this.#postSearch.set(null);
        }
        this.#spinner.hide();
        return throwError(()=> error.error)
      })
    );
  }

  private showMessage(status: boolean, message: string){
    if(status == true){
      this.#toast.success(message);

    } else{
      this.#toast.error(message);
    }
  }

}
