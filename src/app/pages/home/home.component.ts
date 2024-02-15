import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgOptimizedImage, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public comments = signal([
    {
      src: "assets/img/comment-one.jpg",
      person: {
        name: "Eshiley",
        job: "CEO Dantas"
      }
    },
    {
      src: "assets/img/comment-two.jpg",
      person: {
        name: "Eshiley",
        job: "CEO Dantas"
      }
    },
    {
      src: "assets/img/comment-three.jpg",
      person: {
        name: "Eshiley",
        job: "CEO Dantas"
      }
    },
    
  ])

}
