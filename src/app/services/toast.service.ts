import { Injectable } from '@angular/core';

// Components
import { ToastComponent } from '@components/toast/toast.component';
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
  }

  public error(msg: string){

    this.active$.next(true);
    this.message$.next(msg);
    this.typeClass$.next('toastDanger');
    this.icon$.next('fa-solid fa-circle-xmark');
  }

  public warning(msg: string){

    this.active$.next(true);
    this.message$.next(msg);
    this.typeClass$.next('toastWarning');
    this.icon$.next('fa-solid fa-triangle-exclamation');
  }

  public info(msg: string){

    this.active$.next(true);
    this.message$.next(msg);
    this.typeClass$.next('toastInfo');
    this.icon$.next('fa-solid fa-circle-info');
  }

}
