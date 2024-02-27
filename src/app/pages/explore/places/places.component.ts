import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

// Components
import { BoxListComponent } from '../../../shared/components/box-list/box-list.component';
import { DescriptionComponent } from '../../../shared/components/description/description.component';
import { BoxCommentComponent } from '../../../shared/components/box-comment/box-comment.component';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [BoxListComponent, DescriptionComponent, BoxCommentComponent],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss',
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
export class PlacesComponent {

}
