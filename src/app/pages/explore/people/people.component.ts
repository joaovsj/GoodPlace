import { Component } from '@angular/core';
import { BoxListComponent } from '../../../shared/components/box-list/box-list.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [BoxListComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
  animations: [
    trigger('visibility', [
      state('visible', style({
        opacity: 1,
        pointerEvents: 'all' 
      })),

      transition('* => visible', animate('.6s ease'))
    ])
  ]
})
export class PeopleComponent {

}
