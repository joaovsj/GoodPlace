import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stars',
  standalone: true
})
export class StarsPipe implements PipeTransform {

  public countStars: any = "";

  transform(value: unknown, ...args: unknown[]): unknown {

    this.countStars = ""; // reset of stars

    this.setNumberStars(value);
    return this.countStars;
  }

  public setNumberStars(stars: any){
    let contador = 0;

    for(let i=0; i < stars; i++){   
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


