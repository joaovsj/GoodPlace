import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PlacesComponent } from './places/places.component';
import { PeopleComponent } from './people/people.component';



@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, PlacesComponent, ReactiveFormsModule, PeopleComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss', 
})

export class ExploreComponent{

  #fb = inject(FormBuilder);  


  public filterSearch = this.#fb.group({
    category: ['people', Validators.required],
    description: ['']
  })


  submit(){
    console.log(this.filterSearch);
  }

  

}
