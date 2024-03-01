import { ChangeDetectionStrategy, Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

// Components
import { BoxListComponent } from '@components/box-list/box-list.component';
import { BoxPostComponent } from '@components/box-post/box-post.component';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [BoxListComponent, BoxPostComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
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
export class PeopleComponent {

}
