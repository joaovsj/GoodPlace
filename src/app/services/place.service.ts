import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { AuthService } from './auth.service';
import { environment } from 'environments/environment';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IPlace } from 'app/interfaces/IPlace';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  #http  = inject(HttpClient);
  #auth  = inject(AuthService);
  #toast = inject(ToastService)
  #url   = signal<String>(environment.API+"/places");

  public headers: HttpHeaders | undefined;

  constructor() {
    this.#auth.reloadHeaders();
    this.headers = this.#auth.headers;
  }

  #idPlace = signal<String | null >(null);
  public get idPlace(){
    return this.#idPlace.asReadonly();
  }
  public httpPost$(place: IPlace): Observable<any>{
    return this.#http.post<any>(`${this.#url()}`, place, { headers: this.headers }).pipe(
      tap(res => {
        if(res.status){
          this.#idPlace.set(res.id);
        }else{
          this.#toast.info(res.message)
        }
      }),
      catchError((error: HttpErrorResponse)=>{
          
        console.log(error);
        return throwError(()=> error.error)
      })
    );
  }

  
  #places = signal(null); 
  public places = this.#places.asReadonly();

  public getPlaces$(name: String){
    return this.#http.get(`${this.#url()}/?search=${name}`, { headers: this.headers }).pipe(
      tap((res: any)=>{
        if(res.status){
          // console.log(res);
          // console.log(res.body);
          this.#places.set(res.body);
        }
      })
    );
  }


}
