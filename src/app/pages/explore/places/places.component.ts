import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BoxListComponent }     from '@components/box-list/box-list.component';
import { DescriptionComponent } from '@components/description/description.component';
import { BoxCommentComponent }  from '@components/box-comment/box-comment.component';

// Services
import { PostService }    from '@services/post.service';
import { CommentService } from '@services/comment.service';


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
export default  class PlacesComponent implements OnInit{

  #postService    = inject(PostService);
  #commentService = inject(CommentService);

  @Input() public places: any = 0;
  @Input() public stars     = 0;
  public countStars: any = "";
  
  public post: any = this.#postService.post;
  public comments: any = this.#commentService.comments; // list of comments

  public searchDetails(event: Event){

    this.#postService.httpGetId$(event).subscribe();
    this.#commentService.getComments$(event).subscribe();
  }

  public ngOnInit(){
    setTimeout(()=>{
      console.log(this.post());
      console.log(this.comments());
    },5000)
  }

}
