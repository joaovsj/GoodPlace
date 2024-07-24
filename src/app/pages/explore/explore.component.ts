import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import PeopleComponent from './people/people.component';
import PlacesComponent from './places/places.component';

// Services
import { PlaceService } from '@services/place.service';


@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, ReactiveFormsModule, PeopleComponent, PlacesComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss', 
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class ExploreComponent{

  #fb = inject(FormBuilder);  
  #placeService = inject(PlaceService);

  public places = this.#placeService.placesSearch;

  public filterSearch = this.#fb.group({
    category: ['places', Validators.required],
    description: ['']
  })

  submit(){

    if(this.filterSearch.value.category === "places"){
      this.#placeService.search$(this.filterSearch.value.description).subscribe();
    }

    setTimeout(()=>{
      console.log(this.places());
    }, 4000)

    console.log(this.filterSearch);
  }

  

}
