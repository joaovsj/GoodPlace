import { Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

// Components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgOptimizedImage, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public comments = signal([
    {
      src: "assets/img/comment-one.jpg",
      description: "Simplismente incrível, nem acredito que exista uma plataforma só para podermos falar sobre viagens e expriências...",
      person: {
        name: "Eshiley Megan",
        job: "CEO Dantas"
      }
    },
    {
      src: "assets/img/comment-two.jpg",
      description: "Eu tinha um pouco de receio no início, mas depois que comecei a usar não consegui mais parar, super recomendo!",
      person: {
        name: "Richard Russel",
        job: "Sócio-Executivo da Colins"
      }
    },
    {
      src: "assets/img/comment-three.jpg",
      description: "Se quiser saber sobre algum lugar, pesquise aqui à respeito e te garanto que vai se sentir muito mais seguro quando for a sua vez de viajar. ",
      person: {
        name: "Ramiro Fonseca",
        job: "Secretário Defensoria Pública"
      }
    },
    
  ])

}
