import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-monkey',
  standalone: true,
  imports: [],
  templateUrl: './monkey.component.html',
  styleUrl: './monkey.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonkeyComponent {

}
