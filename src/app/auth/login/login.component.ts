import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Services
import { ToastService } from '@services/toast.service';
import { AuthService } from '@services/auth.service';
import { CookieService } from 'ngx-cookie-service';



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
export default class LoginComponent{

  #toast         = inject(ToastService);
  #fb            = inject(FormBuilder);
  #authService   = inject(AuthService);
  #router        = inject(Router);
  #cookies       = inject(CookieService);


  // public error = this.#authService.errorLogin;
  public errorMessage    = signal<String | null>(null);
  public spinnerVisible  = signal<boolean>(false);
  public serverIsDown   = this.#authService.serverIsdown;

  public user = this.#fb.group({
    email:    ["", Validators.required],
    password: ["", Validators.required]
  });
    
  submit(){  

    if(this.user.valid){

      this.#toast.clear();
      this.spinnerVisible.set(true);

      this.#authService.login(this.user.value).subscribe({
        next: (result)  => {

          this.spinnerVisible.set(false);

          if(result.status == true){
            
            this.user.reset();

            this.#toast.success('Logado com sucesso!');
            this.#cookies.set("id", btoa(result.body.id));
            this.#cookies.set('public_token', result.body.public_token);
            this.#cookies.set('isLogged', 'true');
            this.#cookies.set("token", result.token);
            this.#router.navigate(['/profile', result.body.public_token]);

            return;
          }  

          this.#toast.error(result.message);
          this.user.clearValidators(); 
        },
        error: (error)  => {

          this.spinnerVisible.set(false);
          if(this.serverIsDown()){
            this.#toast.error("Ops... Tivemos um problema ao conectar com o servidor.");
          }

          this.user.reset();
          let msg = JSON.stringify(error.error.errors.email);
          msg = msg.replace(/["\[\]]/g,''); 
          this.errorMessage.set(msg);
        }
      });

    }    
  }

  public setAllCookies(data: any){

  }
  
}
