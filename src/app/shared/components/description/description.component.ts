import { AfterContentInit, ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionComponent implements AfterContentInit{ 

  public url = signal(environment.API+"/post/image");
  
  // Post
  @Input() public title: any = "";
  @Input() public stars: number = 0;
  @Input() public comments: number = 0;
  @Input() public description: string = "";
  @Input() public username: string = "";
  @Input() public imagePost: string = "";

  // Adress
  @Input() public address: string = "";  
  @Input() public number: number = 0; 
  @Input() public neighborhood: string = "";  
  @Input() public city: string = ""; 
  @Input() public state: string=""; 
  
  public countStars: any = "";

  ngAfterContentInit(){

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

