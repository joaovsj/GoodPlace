import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';

// Components
import { BoxListComponent }     from '@components/box-list/box-list.component';
import { DescriptionComponent } from '@components/description/description.component';
import { BoxCommentComponent }  from '@components/box-comment/box-comment.component';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [BoxListComponent, DescriptionComponent, BoxCommentComponent],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export default  class PlacesComponent {

}
