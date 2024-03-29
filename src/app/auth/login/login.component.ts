import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

// Services
import { ToastService } from '@services/toast.service';
import { AuthService } from '@services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
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

  #toast         = inject(ToastService);
  #fb            = inject(FormBuilder);
  #authService   = inject(AuthService);
  #router        = inject(Router);

  // public error = this.#authService.errorLogin;
  public errorMessage = signal<String | null>(null);

  public user = this.#fb.group({
    email:    ["", Validators.required],
    password: ["", Validators.required]
  });
    
  submit(){  

    if(this.user.valid){


      this.#authService.login(this.user.value).subscribe({
        next: (result)  => {

          if(result.status == true){
            
            this.user.reset();
            this.#router.navigate(['/profile']);
            return;
          }  

          this.#toast.error(result.message);
          console.log(result)
        
        },
        error: (error)  => {

          this.user.reset();
          let msg = JSON.stringify(error.error.errors.email);
          msg = msg.replace(/["\[\]]/g,''); 
          this.errorMessage.set(msg);
        }
      });

    }    


    // this.#toast.info('Toast is on!');
  }
  
}
