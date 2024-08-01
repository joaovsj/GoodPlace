import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

// Components
import { BoxListComponent } from '@components/box-list/box-list.component';
import { BoxPostComponent } from '@components/box-post/box-post.component';
import { MonkeyComponent }  from '@components/monkey/monkey.component';

// Pipes
import { LocalDatePipe }  from 'app/shared/pipes/local-date.pipe';
import { environment }    from 'environments/environment';

// Services
import { PostService } from '@services/post.service';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [BoxListComponent, BoxPostComponent, CommonModule, LocalDatePipe, MonkeyComponent],
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

  #postService = inject(PostService);

  public url = signal(environment.API+"/user/image");

  public posts: any = this.#postService.allPosts; // all posts


  @Input() public people: any = 0;

  public showDetails(id: any){
    this.#postService.httpGet$(id).subscribe();

    setTimeout(()=>{
      console.log(this.posts());
      console.log(this.people);
    },400);
  }

  
}
