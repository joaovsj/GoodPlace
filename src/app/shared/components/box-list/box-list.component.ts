import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-box-list',
  standalone: true,
  imports: [],
  templateUrl: './box-list.component.html',
  styleUrl: './box-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxListComponent {

}
