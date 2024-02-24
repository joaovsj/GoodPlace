import { Component } from '@angular/core';
import { BoxListComponent } from '../../../shared/components/box-list/box-list.component';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [BoxListComponent],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {

}
