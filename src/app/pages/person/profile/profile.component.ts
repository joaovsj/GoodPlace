import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';

// Services
import { UserService } from '@services/user.service';
import { LocalDatePipe } from 'app/shared/pipes/local-date.pipe';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgClass, CommonModule, LocalDatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('state', [
      transition(':enter', [
        style({opacity: 0, transform: "translate(200px)"}),
        animate('1s ease', style({opacity: 1, transform: 'translateX(0)'}))
      ]), 
      transition(':leave', [
        style({opacity: 1, transform: "translateX(0)"}),
        animate('.2s ease', style({opacity: 0, transform: "translateX(-80px)"}))
      ])      
    ]), 

    trigger('register', [
      transition(':enter', [
        style({opacity: 0, transform: "translateY(-20px)"}),
        animate('.5s ease', style({opacity: 1, transform: 'translateY(0)'}))
      ]), 
      transition(':leave', [
        style({opacity: 1, transform: "translateY(0)"}),
        animate('.2s ease', style({opacity: 0, transform: "translateY(-20px)"}))
      ])      
    ]), 
    
  ]
})

export class ProfileComponent implements OnInit{


  #user     = inject(UserService);
  #Cookies  = inject(CookieService);

  public finalizeRegister = signal<boolean>(false);

  public stepForm  = signal<string>('step-1'); // Step of the Form
  public stepBar   = signal<number>(1)          // step of the bar in bottom

  
  public user = this.#user.userId;
  public icons$ = this.#user.getIcons$();
  public icon = signal(null);

  public dateCreated: any = this.user()?.created_at;

  public ngOnInit(){

    const userId = atob(this.#Cookies.get('id'))
    this.#user.getUser$(userId).subscribe(); 
    this.#user.getIcons$().subscribe();
    
    this.icons$.subscribe({
      next: (res) => this.icon.set(res),
    })

    console.log(this.icons$);
    console.log(this.icon());

    
  }


  public nextStep(step: string){
    this.stepForm.set(step);
    this.stepBar.update((oldValue) => {
      return oldValue + 1
    })
  }

  public finalize(){  
    this.finalizeRegister.update(oldValue => !oldValue)
  }


}


