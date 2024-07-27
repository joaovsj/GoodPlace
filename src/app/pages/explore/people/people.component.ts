import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

// Components
import { BoxListComponent } from '@components/box-list/box-list.component';
import { BoxPostComponent } from '@components/box-post/box-post.component';

// Pipes
import { LocalDatePipe } from 'app/shared/pipes/local-date.pipe';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [BoxListComponent, BoxPostComponent, CommonModule, LocalDatePipe],
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
export default class PeopleComponent {

  public url = signal(environment.API+"/user/image");


  @Input() public people: any = 0;


}
