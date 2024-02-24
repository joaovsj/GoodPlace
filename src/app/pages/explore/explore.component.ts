import { Component, DoCheck, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Components
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PlacesComponent } from './places/places.component';


@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, PlacesComponent, ReactiveFormsModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss', 
})

export class ExploreComponent implements DoCheck{
  
  #fb = inject(FormBuilder);


  public filterSearch = this.#fb.group({
    category: ['', Validators.required],
    description: ['']
  })

  
  ngDoCheck(){
    
    const valueFilter = this.filterSearch.value;
    console.log(valueFilter.category);
    console.log('got in');
  }

  submit(){
    console.log(this.filterSearch);
  }

  

}
