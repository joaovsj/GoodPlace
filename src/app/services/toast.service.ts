import { Injectable } from '@angular/core';

// Components
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public message$:  BehaviorSubject<String>  = new BehaviorSubject<String>("Mensagem padrão"); 
  public typeClass$: BehaviorSubject<String> = new BehaviorSubject<String>("success");
  public icon$:      BehaviorSubject<String>  = new BehaviorSubject<String>("default");

  constructor() { }

  public success(msg: string){

    this.active$.next(true);
    this.message$.next(msg);
    this.typeClass$.next('toastSuccess');
    this.icon$.next('fa-solid fa-circle-check');
    this.callClear();
  }

  public error(msg: string){

    this.active$.next(true);
    this.message$.next(msg);
    this.typeClass$.next('toastDanger');
    this.icon$.next('fa-solid fa-circle-xmark');
    this.callClear();
  }

  public warning(msg: string){

    this.active$.next(true);
    this.message$.next(msg);
    this.typeClass$.next('toastWarning');
    this.icon$.next('fa-solid fa-triangle-exclamation');
    this.callClear();
  }

  public info(msg: string){
    this.active$.next(true);
    this.message$.next(msg);
    this.typeClass$.next('toastInfo');
    this.icon$.next('fa-solid fa-circle-info');

    this.callClear();
  }

  public clear(){
    this.active$.next(false);
  }


  private callClear(){
    setTimeout(() => {
      this.clear();
    }, 7000);
  }

}
