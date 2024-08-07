import {ChangeDetectionStrategy, Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionComponent implements OnChanges{
  

  public url = signal(environment.API+"/post/image");
  
  // Post
  @Input() public title: any = "";
  @Input() public stars: number = 0;
  @Input() public comments: number = 0;
  @Input() public description: string = "";
  @Input() public username: string = "";
  @Input() public imagePost: string = "";
  @Input() public details: any = [];
  @Input() public category: any = [];
  @Input() public public_token: string = "";

  // Adress
  @Input() public address: string = "";  
  @Input() public number: number = 0; 
  @Input() public neighborhood: string = "";  
  @Input() public city: string = ""; 
  @Input() public state: string=""; 
  

  public countStars: any = "";
  public result: any = [];

  ngOnChanges(changes: SimpleChanges): void {

    this.result = [];
    this.countStars = "";
    this.comments = 0;


    if(changes.hasOwnProperty('stars')){
      this.stars = changes['stars'].currentValue;  
    }

    if(changes.hasOwnProperty('comments')){
      this.comments = changes['comments'].currentValue;
    }
  
    this.details  = changes['details'].currentValue;
    
    this.changeDetails();
    this.setNumberStars();
  }

  private changeDetails() {

    if(this.details){
      let regex = /\["([^"]+)", "([^"]+)"\]/g;
      let match;
    
      while ((match = regex.exec(this.details)) !== null) {
        // match[1] and match[2] has the values tracked by groups in regex
        this.result.push([match[1], match[2]]);
      }
    }
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

