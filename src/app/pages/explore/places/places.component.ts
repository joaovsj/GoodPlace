import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BoxListComponent }     from '@components/box-list/box-list.component';
import { DescriptionComponent } from '@components/description/description.component';
import { BoxCommentComponent }  from '@components/box-comment/box-comment.component';
import { MonkeyComponent } from '@components/monkey/monkey.component';
import { MakeCommentComponent } from '@components/make-comment/make-comment.component';

// Services
import { PostService }    from '@services/post.service';
import { CommentService } from '@services/comment.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-places',
  standalone: true,
  imports: [BoxListComponent, DescriptionComponent, BoxCommentComponent, CommonModule, MonkeyComponent, MakeCommentComponent],
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
  #cookieService  = inject(CookieService);

  @Input() public places: any = 0;
  @Input() public stars     = 0;
  public countStars: any = "";
  
  public post: any = this.#postService.post;
  public comments: any = this.#commentService.comments; // list of comments

  public post_id: any = "";
  public public_token = ""; // user's public token logged


  ngOnInit(){
    this.public_token = this.#cookieService.get('public_token'); 
  }

  public searchDetails(event: Event){
    
    this.post_id = event;
      
    this.#postService.httpGetId$(event).subscribe();
    this.#commentService.getComments$(event).subscribe();

    // setTimeout(()=>{
    //   console.log(this.post());
    //   // console.log(this.comments());
    // },5000)
  }

  public reloadComments(event: Event){
    if(event){
      this.#commentService.getComments$(this.post_id).subscribe();
    }
  }

}
