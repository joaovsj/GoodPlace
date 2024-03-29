import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
// Components
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgClass],
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
export class ProfileComponent {
  

  public finalizeRegister = signal<boolean>(false);

  public stepForm = signal<string>('step-1'); // Step of the Form
  public stepBar = signal<number>(1)          // step of the bar in bottom
  

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
