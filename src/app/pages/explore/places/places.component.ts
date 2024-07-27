import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BoxListComponent }     from '@components/box-list/box-list.component';
import { DescriptionComponent } from '@components/description/description.component';
import { BoxCommentComponent }  from '@components/box-comment/box-comment.component';


@Component({
  selector: 'app-places',
  standalone: true,
  imports: [BoxListComponent, DescriptionComponent, BoxCommentComponent, CommonModule],
  templateUrl: './places.component.html',
  styleUrl: './places.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibility', [
      state('visible', style({
        opacity: 1,
        pointerEvents: 'all' 
      })),

      transition('* => visible', animate('.6s ease'))
    ])
  ]
})
export default  class PlacesComponent implements AfterContentInit{

  @Input() public places: any = 0;
  @Input() public stars     = 0;
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
