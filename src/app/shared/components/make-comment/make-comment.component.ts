import { ChangeDetectionStrategy, Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-make-comment',
  standalone: true,
  imports: [EditorModule],
  templateUrl: './make-comment.component.html',
  styleUrl: './make-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MakeCommentComponent {

  @Input() public hasComment = false;
  @ViewChild('description') public description!: ElementRef | any

  public register(){
    this.hasComment = true;
  }

} 
