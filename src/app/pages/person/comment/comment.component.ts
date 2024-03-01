import { ChangeDetectionStrategy, Component } from '@angular/core';

// Components
import { HeaderComponent }      from '@components/header/header.component';
import { FooterComponent }      from '@components/footer/footer.component';
import { DescriptionComponent } from '@components/description/description.component';
import { BoxCommentComponent }  from '@components/box-comment/box-comment.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DescriptionComponent, BoxCommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {

}
