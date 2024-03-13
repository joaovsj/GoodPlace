import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Services
import { AuthService } from '@services/auth.service';



@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
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
  

  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  
  public user = this.#fb.group({

    name: ["", Validators.required],
    email: ["", Validators.required], 
    password: ["", Validators.required, Validators.min(6), Validators.max(12)], 
    password_confirmation: ["", Validators.required] 
    
  });




  public postUser(){

    const user = {
      "name": "antoin",
      "email": "antoin@gmail.com",
      "password": "12345",
      "password_confirmation": "123",
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


  public submit(){
    alert('teste');
  }


}
