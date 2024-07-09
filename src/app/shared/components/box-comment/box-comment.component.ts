import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-box-comment',
  standalone: true,
  imports: [],
  templateUrl: './box-comment.component.html',
  styleUrl: './box-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxCommentComponent {

  public url = signal<string>(environment.API+"/user/image")

  @Input() public name        = "";
  @Input() public image       = "";
  @Input() public description = "";

}
