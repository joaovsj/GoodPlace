import { Component, Input, ɵɵInputTransformsFeature } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input({required: true }) public text: string = ""
  @Input() public nameClass: string = ""
  @Input() public newStyle!: {}

}
