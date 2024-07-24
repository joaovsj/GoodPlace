import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BoxListComponent }     from '@components/box-list/box-list.component';
import { DescriptionComponent } from '@components/description/description.component';
import { BoxCommentComponent }  from '@components/box-comment/box-comment.component';


@Component({
  selector: 'app-places',
  standalone: true,
  imports: [BoxListComponent, DescriptionComponent, BoxCommentComponent, CommonModule],
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
export default  class PlacesComponent{

  @Input() public places: any = 0;

}
