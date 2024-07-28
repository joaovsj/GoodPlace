import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import PeopleComponent from './people/people.component';
import PlacesComponent from './places/places.component';

// Services
import { PlaceService } from '@services/place.service';
import { PostService } from '@services/post.service';
import { SpinnerService } from '@services/spinner.service';


@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ReactiveFormsModule, PeopleComponent, PlacesComponent, SpinnerComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class ExploreComponent{

  #fb = inject(FormBuilder);  
  #placeService = inject(PlaceService);
  #postService  = inject(PostService);

  
  public spinner = inject(SpinnerService);

  public places = this.#placeService.placesSearch;
  public people = this.#postService.postSearch;

  public filterSearch = this.#fb.group({
    category: ['places', Validators.required],
    description: ['']
  })


  submit(){
    
    if(this.filterSearch.value.category === "places"){
    
      this.spinner.show();
      this.#placeService.search$(this.filterSearch.value.description).subscribe();
    }
    
    if(this.filterSearch.value.category === "people"){
      
      this.spinner.show();
      this.#postService.search$(this.filterSearch.value.description).subscribe();
    } 

    return;
  }

  

}
