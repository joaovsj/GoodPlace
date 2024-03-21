import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('init', [
      state('show', style({
        opacity: 1,
        // height: 'min-content'
      })), // close state

      transition('* => show', animate('1s ease'))
    ])
  ]
})
export class ToastComponent{


  public allClasses = signal([
    "success",
    "error",
    "warning",
    "info"
  ]);

  public icons = [
    "fa-solid fa-circle-check",
    "fa-solid fa-circle-xmark",
    "fa-solid fa-triangle-exclamation",
    "fa-solid fa-circle-info"
  ];

  // <i class="fa-solid fa-circle-info"></i>

  constructor(){
    setInterval(()=>{
      this.showsToast.set(!this.showsToast());
    },3000)
  }


  public message      = signal<String>("Cadastro relizado com sucesso!"); 
  public showsToast   = signal<boolean>(false);
  public classActive  = signal<String>("toastSuccess");
  public iconActive   = signal<String>("fa-solid fa-circle-check");
  
  private setToast(type: String, msg: String, icon: String){
    this.classActive.set(type);
    this.message.set(msg);
    this.iconActive.set(icon);
  }

  public success(msg: string){
    return this.setToast('success', msg, 'fa-solid fa-circle-check');
  }

  public error(msg: string){
    return this.setToast('error', msg, 'fa-solid fa-circle-xmark');
  }

  public warning(msg: string){
    return this.setToast('warning', msg, 'fa-solid fa-triangle-exclamation');
  }

  public info(msg: string){
    return this.setToast('info', msg, 'fa-solid fa-circle-info');
  }
}



