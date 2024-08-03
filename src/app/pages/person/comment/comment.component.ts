import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Components
import { HeaderComponent }      from '@components/header/header.component';
import { FooterComponent }      from '@components/footer/footer.component';
import { DescriptionComponent } from '@components/description/description.component';
import { BoxCommentComponent }  from '@components/box-comment/box-comment.component';
import { MakeCommentComponent } from '@components/make-comment/make-comment.component';

// Services
import { PostService }    from '@services/post.service';
import { CommentService } from '@services/comment.service';
import { CookieService } from 'ngx-cookie-service';

// Interfaces
import { IPost } from 'app/interfaces/IPost';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DescriptionComponent, BoxCommentComponent, CommonModule, MakeCommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit{
  
  #activedRoute   = inject(ActivatedRoute);
  #router         = inject(Router);
  #postService    = inject(PostService);
  #commentService = inject(CommentService);
  #cookieService  = inject(CookieService);

  public post: any = this.#postService.post;
  public details: any = [];

  public comments: any = this.#commentService.comments; // list of comments
  public post_id!: string;

  public public_token = ""; // user's public token logged

  ngOnInit() {
    
    this.post_id = this.#activedRoute.snapshot.params['idPost'];
    this.public_token = this.#cookieService.get('public_token'); 
    
    this.#postService.httpGetId$(this.post_id).subscribe();
    this.#commentService.getComments$(this.post_id).subscribe();

  }

  public redirect(){
    setTimeout(()=>{
      this.#router.navigate(['/explore']);
    },1200);
  }


}
