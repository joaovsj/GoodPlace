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


  
  public spinner = inject(SpinnerService);

  public places = this.#placeService.placesSearch;

  public filterSearch = this.#fb.group({
    category: ['places', Validators.required],
    description: ['']
  })


  submit(){

    this.spinner.show();

    if(this.filterSearch.value.category === "places"){
      this.#placeService.search$(this.filterSearch.value.description).subscribe({
      });
    }

    setTimeout(()=>{
      console.log(this.places());
    }, 4000)

    console.log(this.filterSearch);
  }

  

}
