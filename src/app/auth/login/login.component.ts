import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// Services
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('init', [
      state('show', style({
        opacity: 1
      })),


      transition('* => show', animate('.6s ease'))
    ])
  ]
})
export default class LoginComponent {

  #toast = inject(ToastService);

  login(){
    this.#toast.info('Toast is on!');
  }
  
}
