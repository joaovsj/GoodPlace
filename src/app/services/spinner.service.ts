import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor() { }

  public show(){
    this.active$.next(true);
  }

  public hide(){
    this.active$.next(false);
  }
}
