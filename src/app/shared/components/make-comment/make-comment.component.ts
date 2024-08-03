import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

// Services
import { CookieService } from 'ngx-cookie-service';
import { CommentService } from '@services/comment.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-make-comment',
  standalone: true,
  imports: [EditorModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './make-comment.component.html',
  styleUrl: './make-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakeCommentComponent{

  #fb               = inject(FormBuilder);
  #cookieService    = inject(CookieService);
  #commentService   = inject(CommentService);

  @Input() public idPost        = "";
  // @Input() public public_token  = "";
  public userId        = atob(this.#cookieService.get('id'));

  @ViewChild('description') public description!: ElementRef | any
  @Output() public registered = new EventEmitter(false);
  
  public comment = this.#fb.group({
    description: ["", [Validators.minLength(30), Validators.required]],
    user_id: [this.userId],
    post_id: [this.idPost]
  });

  public showForm = false;

  public statusComments = this.#commentService.comment; 

  submit(){
    this.comment.value.post_id = this.idPost;

    this.#commentService.postComment$(this.comment.value).pipe(finalize(()=> {
      if(this.comment){
        this.showForm = false;
        this.registered.emit(true);
      }
    })).subscribe();
  }




} 
