import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, inject, signal, viewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { EventEmitter, Output } from "@angular/core";

import { environment } from 'environments/environment';
import { contryList } from 'app/classes/countries';
// INTERFACES
import { IAssessment } from 'app/interfaces/IAssessment';
import { IPlace } from 'app/interfaces/IPlace';
// SERVICES
import { PlaceService } from '@services/place.service';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';
import { PostService } from '@services/post.service';

// EDTIOR
import { EditorModule } from '@tinymce/tinymce-angular';
import { tap } from 'rxjs';

// Components
import { SpinnerComponent } from '@components/spinner/spinner.component';


@Component({
  selector: 'app-modal-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, EditorModule, SpinnerComponent],
  templateUrl: './modal-profile.component.html',
  styleUrl: './modal-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('state', [
      transition(':enter', [
        style({opacity: 0, transform: "translate(200px)"}),
        animate('1s ease', style({opacity: 1, transform: 'translateX(0)'}))
      ]), 
      transition(':leave', [
        style({opacity: 1, transform: "translateX(0)"}),
        animate('.2s ease', style({opacity: 0, transform: "translateX(-80px)"}))
      ])      
    ]), 

    trigger('register', [
      transition(':enter', [
        style({opacity: 0, transform: "translateY(-20px)"}),
        animate('.5s ease', style({opacity: 1, transform: 'translateY(0)'}))
      ]), 
      transition(':leave', [
        style({opacity: 1, transform: "translateY(0)"}),
        animate('.2s ease', style({opacity: 0, transform: "translateY(-20px)"}))
      ])      
    ]), 

    trigger('send', [
      transition(':enter', [
        style({opacity: 0, transform: "translateX(-20px)"}),
        animate('.5s ease', style({opacity: 1, transform: 'translatX(8px)'}))
      ]), 
    ])

    
  ]
})
export class ModalProfileComponent {

  @Output() public registerDone = new EventEmitter(false);
  @ViewChild('description') public description!: ElementRef | any
  // @ViewChild('btnClose') public btnClose!: ElementRef | any

  #user     = inject(UserService);
  #place    = inject(PlaceService);
  #post     = inject(PostService);
  #fb       = inject(FormBuilder);
  #toast    = inject(ToastService);
  public url = signal<string>(environment.API+"/user/image")

  public categories = this.#user.categories;
  public idPlace: any = this.#place.idPlace;
  public idPost  = this.#post.idPost;

  public statusPost = this.#post.httpPost$;

  public formData: FormData = new FormData()
  public assessmentValues: any = []
  public contries = signal<any>(contryList);
  public address: any = "";

  public stepForm  = signal<string>('step-1'); // Step of the Form
  public stepBar   = signal<number>(1)          // step of the bar in bottom

  // form of register places
  public temporaryName = signal<String>("");
  public placeRegistered = signal<boolean>(false);
  public numberStars = signal<number>(0);
  public placeAddress: any = [];  
  public spinner = signal(false);

  public place: IPlace | any = this.#fb.group({
    name:          [""],
    cep:           ["", Validators.required],
    address:       ["", Validators.required],
    number:        ["", Validators.required],
    city:          ["", Validators.required],
    neighborhood:  ["", Validators.required],
    state:         ["", Validators.required],
    country:       ["", Validators.required],
    category_id:   [""],
  })

  public assessment: IAssessment | any = this.#fb.group({
    assessment:     ["", Validators.required],
    description:    ["", Validators.required], 
    user_id:        [""],
    place_id:       [""],
    details:        this.#fb.array([
      ['']    
    ]),
    category_id:   ["", Validators.required],
  })


  public places: any = this.#place.places;
  public spinnerShow = signal<boolean>(false);

  // method responsible to search some place by name
  public findPlace(name: string = ""){

    if(name == ""){
      this.#place.getPlaces$(this.temporaryName()).subscribe();
    
    } else{
      this.#place.getPlaces$(name).subscribe();
    }


    // this.spinnerShow.set(false);
  }

  public changeName(name: string){
    this.temporaryName.set(name);
    this.placeRegistered.set(false);
  }


  // method responsible to define Id of place already registered
  public setPlaceAlreadyRegistered(id: string){
    this.idPlace = id;
    this.nextStep('step-final');
  }

  // adds new field as detail in form
  public addNewDetail(detail: string, assessment: string){
    const detailsForm = this.assessment.get('details') as FormArray;
    const value = new FormControl([detail, assessment]);
    detailsForm.push(value);
  }

  // modify the step on form
  public nextStep(step: string){

    if(step == 'step-3') this.findPlace(); // case place already exists

    this.stepForm.set(step);
    this.stepBar.update((oldValue) => {
      return oldValue + 1
    })
  }

  // store posts(place and assessment)
  async submit(){

    this.spinner.set(true);

    const filledFile = this.formData.has('image');

    if(this.assessment.value.description == "" || filledFile == false) {

      this.spinner.set(false);
      return;
    }
  

    let status: any = true;
    this.modifiedFields();

    if(typeof this.idPlace == "function"){
      status = await this.registerPlace();
    }

    if(status == false){
      this.spinner.set(false);
      return;
    }

    const statusAssessment = await this.registerAssessment();
    
    if(statusAssessment){
      this.send();
    }

    this.spinner.set(false);
  }
  
  // store place and wait return id
  public registerPlace(){
    return new Promise(resolve => {
      this.#place.httpPost$(this.placeAddress).subscribe({
        next(value) {
          if(value.status == false){
            resolve(false);
          }
        },
        complete() {
        resolve(true)
      },});
    });
  }

  // store assessment
  public registerAssessment(){

    if((typeof this.idPlace) == "function"){
      this.assessmentValues.place_id = this.idPlace();
    } else{      
      this.assessmentValues.place_id = this.idPlace;
    }
  
    this.assessmentValues.user_id  = this.#user.userId()?.id;
   
    return new Promise(resolve => {
      this.#post.httpPost$(this.assessmentValues).subscribe({ complete(){
        resolve(true)
      } });
    });
  }
  

  // assign values in another property
  public modifiedFields(){  
    if(typeof this.idPlace == "function"){

      this.placeAddress = this.place.value;
      this.placeAddress.name = this.temporaryName();
          
      this.placeAddress.category_id = this.assessment.value.category_id;
    }

    this.assessmentValues = this.assessment.value;
    this.assessmentValues.assessment = this.numberStars();
  }

  // search CEP by parameter
  public findAdressByCEP(cep: any){
    if(cep.length === 8){
      this.#user.getAddress$(cep).subscribe({
        next: (res) => {
          if(res.hasOwnProperty('erro')){
            
            this.#toast.error('Erro ao encontrar o endereço... ');
            this.place.reset();
           }else{

            this.place.patchValue({
              cep:           res.cep,
              address:       res.logradouro,
              city:          res.localidade,
              neighborhood:  res.bairro,
              state:         res.uf,
            })
          }
        },
      }); 
    }
  }

  // get the name from the first input
  public receiveName(name: string){
    if(name == "")
      return;
    this.temporaryName.set(name);
    this.nextStep('step-2');
  }

  // set the numver of stars
  public setNumberStarts(stars: number){
    this.numberStars.set(stars);
  }

  // check if place is already registered
  public alreadyRegistered(status: boolean){
    this.placeRegistered.set(status)
  }

  // method responsible to add image on form data
  public onfileSelected(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0]; 
      this.formData.append('image', file);
    } 
  }

  // method responsible for uploding file
  public send(){
    const id: string = this.#post.idPost();
    this.formData.append('post_id', id);
    this.#post.upload$(this.formData).subscribe();
    this.registerDone.emit(true);
  }

}


