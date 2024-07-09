import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

// Components
import { HeaderComponent }      from '@components/header/header.component';
import { FooterComponent }      from '@components/footer/footer.component';
import { DescriptionComponent } from '@components/description/description.component';
import { BoxCommentComponent }  from '@components/box-comment/box-comment.component';

// Services
import { PostService } from '@services/post.service';

// Interfaces
import { IPost } from 'app/interfaces/IPost';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DescriptionComponent, BoxCommentComponent, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit, OnDestroy{
  
  #activedRoute = inject(ActivatedRoute);
  #postService  = inject(PostService);

  public post: any = this.#postService.post;
  public details: any = [];

  public subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.#postService.httpGetId$(this.#activedRoute.snapshot.params['idPost']).subscribe();
    
    // console.log('ativo');

    // setTimeout(()=>{
    //   console.log(this.post());
    // }, 4000)

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
