import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('init', [
      state('show', style({
        opacity: 1
      })),


      transition('* => show', animate('.6s ease'))
    ])
  ]
})
export class LoginComponent {

}