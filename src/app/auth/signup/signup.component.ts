import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// COMPONENTS
import { SpinnerComponent } from '@components/spinner/spinner.component';
// SERVICES
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';

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
  
  #fb          = inject(FormBuilder);
  #authService = inject(AuthService); 
  #toast       = inject(ToastService);
  #router      = inject(Router);

  public user   = this.#fb.group({

    name:                  ["", Validators.required],
    email:                 ["", Validators.required], 
    password:              ["", Validators.required], 
    password_confirmation: ["", Validators.required] ,
    phone:                 [""],
    social_media:          [""]
    
  });
  
  public spinnerVisible  = signal<boolean>(false);
  public allMessages     = signal<string>(""); 
  public invalidEmail    = signal<boolean>(false);
  public invalidPassword = signal<boolean>(false);
  public errors          = this.#authService.errorRegister;    
  


  public submit(): void | any{

    if(this.user.valid){

      this.spinnerVisible.set(true);

      return this.#authService.httpPostUser(this.user.value).subscribe({
        next: (result) => { 
          this.spinnerVisible.set(false)
          this.resetErrorsFields();

          if(result.status){
            this.#toast.success('Usuário cadastrado com sucesso!');
            this.#router.navigate(['/profile']);
          }
        
        
        },
        error: (error) => {
          if(this.errors()){
          
            this.resetErrorsFields();
            const errors = this.errors();
            
            if(errors.code == 0){

              this.#toast.error("Ops... Tivemos um problema ao conectar com o servidor.");
              this.spinnerVisible.set(false);
              return;
            }

            if(error.errors.email){
              this.invalidEmail.set(true);
              this.allMessages.update((oldValue)=> {
                return oldValue + `<li>${error.errors.email}</li>`
              });
            } 

            if(error.errors.password){
              this.invalidPassword.set(true);
              this.allMessages.update((oldValue)=> {
                return oldValue + `<li>${error.errors.password}</li>`
              });
            }

      
          }

          this.spinnerVisible.set(false);
      }

      }); /* close subscribe */       
    }
  }


  private resetErrorsFields(){
    this.allMessages.set("");
    this.invalidEmail.set(false);
    this.invalidPassword.set(false);
  }

}
