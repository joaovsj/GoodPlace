import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';


// Services
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgOptimizedImage, FooterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomeComponent{

  #cookieService = inject(CookieService);


  public comments = signal([
    {
      src: "assets/img/some-comment.jpg",
      description: "Simplismente incrível, nem acredito que exista uma plataforma só para podermos falar sobre viagens e experiências...",
      person: {
        name: "Eshiley Megan",
        job: "CEO Dantas"
      }
    },
    {
      src: "assets/img/comment-two.jpg",
      description: "Eu tinha um pouco de receio no início, até porque não conhecia muito, mas depois que comecei a usar não consegui mais parar, super recomendo!",
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
