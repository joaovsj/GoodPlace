import { Component } from '@angular/core';

// Components
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { DescriptionComponent } from '../../../shared/components/description/description.component';
import { BoxCommentComponent } from '../../../shared/components/box-comment/box-comment.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DescriptionComponent, BoxCommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {

}
