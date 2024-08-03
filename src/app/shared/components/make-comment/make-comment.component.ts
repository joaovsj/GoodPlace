import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-make-comment',
  standalone: true,
  imports: [EditorModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './make-comment.component.html',
  styleUrl: './make-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakeCommentComponent implements OnInit {

  @Input() public hasComment    = false;
  @Input() public idPost        = "";
  @Input() public public_token  = "";
  
  #fb = inject(FormBuilder);

  public comment = this.#fb.group({
    description: ["", Validators.minLength(30)],
    user_id: [""],
    post_id: [""]
  });


  @ViewChild('description') public description!: ElementRef | any

  // public register(){
  //   this.hasComment = true;
  // }


  submit(){
    this.hasComment = true;
    console.log("teste");
  }

  ngOnInit() {
    console.log(this.idPost);
    console.log(this.public_token);
  }

} 
