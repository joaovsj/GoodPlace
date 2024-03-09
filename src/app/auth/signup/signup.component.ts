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
export default class SignupComponent implements OnInit{
  
  #authService = inject(AuthService);
  
  public postUser(){


    const user = {
        "name": "joao",
        "email": "joao@gmail.com",
        "password": "12345",
        "password_confirmation": "12345",
        "phone": "15 999999999",
        "social_media": [
            {
                "instagram": "joao@instragram",
                "linkedin": "https://www.linkedin.com/in/joao/",
                "github": "github.com/joao"
            }
        ]
    }

    return this.#authService.httpPostUser(user).subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)
    });
  }

  ngOnInit(){
    return this.#authService.teste().subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error)
    });
  }

}
