import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'environments/environment';

// Service
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

// Interface
import { IComment } from 'app/interfaces/Icomment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  #url    = signal<string>(environment.API+"/comments");  
  #http   = inject(HttpClient); 
  #auth   = inject(AuthService);
  #toast  = inject(ToastService); 
  
  public headers: HttpHeaders | undefined;

  constructor() {
    this.#auth.reloadHeaders();
    this.headers = this.#auth.headers;
  }

  #comments = signal<IComment | null>(null);
  public comments = this.#comments.asReadonly();

  public getComments$(id: any){
    return this.#http.get(`${this.#url()}/?post_id=${id}`, { headers: this.headers }).pipe(
      tap((res: any)=>{
        if(res.status){
          this.#comments.set(res.body)
        }
      })
    );
  }



}
