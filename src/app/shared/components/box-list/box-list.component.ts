import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-box-list',
  standalone: true,
  imports: [],
  templateUrl: './box-list.component.html',
  styleUrl: './box-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxListComponent {
  
  public url  = signal(environment.API+"/post/image");

  @Input() public title       = "";
  @Input() public countStars  = 0;
  @Input() public comments    = 0;
  @Input() public author      = "";
  @Input() public imageName       = "";
  

  

}
