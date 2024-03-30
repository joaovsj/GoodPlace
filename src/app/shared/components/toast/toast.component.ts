import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('init', [
      // animate(duração, delay, tipo)
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),// close state

      transition('* => show', animate('.8s ease')),
      // transition('show => *', animate('3s ease'))
    ])
  ]
})
export class ToastComponent{

  public toast = inject(ToastService);

  constructor(){ }
  
  dismiss(){
    this.toast.active$.next(false);
  }

}



