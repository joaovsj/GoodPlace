import { AfterContentInit, Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

// Services
import { PostService } from '@services/post.service';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-box-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './box-post.component.html',
  styleUrl: './box-post.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxPostComponent implements AfterContentInit{


  #postService  = inject(PostService);

  public url = signal(environment.API+"/post/image");

  // public name = "";
  @Input() public idPost    = 0;
  @Input() public namePost  = "";
  @Input() public imagePost = signal("");   
  @Input() public userName  = signal("");
  @Input() public stars     = 0;
  @Input() public comments  = 0;

  @Input() public deletePost: any = 0;

  @Output() public deleted = new EventEmitter(false);

  public countStars: any = "";

  ngAfterContentInit(){

    // setTimeout(()=>{
      // console.log(this.stars);
    // },4000)

    
    this.setNumberStars();
  }

  setNumberStars(){
    let contador = 0;
    for(let i=0; i < this.stars; i++){   
      this.countStars+=`
        <li><i class="bi bi-star-fill"></i></li>
      `;

      contador++;
    }

    if(contador<5){
      for (let i = contador; i < 5; i++) {
        this.countStars+=`<li><i class="bi bi-star"></i></li>`;
      }
    }
  }

  public delete(id: any): void{
    const resultado = window.confirm("Você realmente quer apagar essa postagem?");

    if(resultado){
      this.#postService.httpDelete$(id).subscribe({
        complete: ()=>{
          this.deleted.emit(true);
        }
      });
    }
  }

}
