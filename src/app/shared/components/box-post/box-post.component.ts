import { AfterContentInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  public url = signal(environment.API+"/post/image");

  // public name = "";
  @Input() public idPost    = 0;
  @Input() public namePost  = "";
  @Input() public imagePost = signal("");   
  @Input() public userName  = signal("");
  @Input() public stars     = 0;
  @Input() public comments  = 0;

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


}
