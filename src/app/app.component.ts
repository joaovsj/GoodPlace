import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Component
import { ToastComponent } from '@components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastComponent],
  template: `
    <app-toast/>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'GoodPlace';
}
