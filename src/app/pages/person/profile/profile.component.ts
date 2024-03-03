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
    ])

  ]
})
export class ProfileComponent {
  
  public step = signal<string>('step-1');
  
}
