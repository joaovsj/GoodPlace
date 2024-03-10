import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

// Services
import { AuthService } from '@services/auth.service';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('init', [
      state('show', style({
        opacity: 1,
        // height: 'min-content'
      })), // close state

      transition('* => show', animate('.6s ease'))
    ])
  ]
})
export default class SignupComponent{
  
  #authService = inject(AuthService);
  
  public postUser(){

    const user = {
      "name": "antoin",
      "email": "antoin@gmail.com",
      "password": "12345",
      "password_confirmation": "12345",
      "phone": "15 999999999",
      "social_media": [
          {
              "instagram": "antoin@instragram",
              "linkedin": "https://www.linkedin.com/in/antoin/",
              "github": "github.com/antoin"
          }
      ]
    }

    return this.#authService.httpPostUser(user).subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)
    });      
  }


}
