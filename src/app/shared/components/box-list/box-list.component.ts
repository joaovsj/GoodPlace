import { AfterContentInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-box-list',
  standalone: true,
  imports: [],
  templateUrl: './box-list.component.html',
  styleUrl: './box-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxListComponent implements AfterContentInit{
  
  public url  = signal(environment.API+"/post/image");

  @Input() public idPost      = "";
  @Input() public title       = "";
  @Input() public stars       = 0;  
  @Input() public comments    = 0;
  @Input() public author      = "";
  @Input() public imageName   = "";

  @Output() public idPostEvent = new EventEmitter();

  public countStars: any  = "";

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
  

  public showDetails(idPost: any){
    this.idPostEvent.emit(idPost);
  }

}
