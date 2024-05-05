import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';


import { environment } from 'environments/environment';
import { contryList } from 'app/classes/countries';
// INTERFACES
import { IAssessment } from 'app/interfaces/IAssessment';
import { IPlace } from 'app/interfaces/IPlace';
// SERVICES
import { PlaceService } from '@services/place.service';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';
import { CookieService } from 'ngx-cookie-service';

// EDTIOR
import { EditorModule } from '@tinymce/tinymce-angular';


@Component({
  selector: 'app-modal-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, EditorModule],
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

  #user     = inject(UserService);
  #place    = inject(PlaceService)
  #fb       = inject(FormBuilder);
  #toast    = inject(ToastService);
  public url = signal<string>(environment.API+"/user/image")

  public categories = this.#user.categories;
  public idPlace = this.#place.idPlace;

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
    user_id:        ["", Validators.required],
    place_id:       ["", Validators.required],
    details:        this.#fb.array([
      ['']    
    ]),
    category_id:   ["", Validators.required],
  })

  public addNewDetail(detail: string, assessment: string){
    const detailsForm = this.assessment.get('details') as FormArray;
    const value = new FormControl([detail, assessment]);
    detailsForm.push(value);
  }


  public nextStep(step: string){
    this.stepForm.set(step);
    this.stepBar.update((oldValue) => {
      return oldValue + 1
    })
  }


  async registerPlace(){
    this.modifiedFields();
    const status = await this.getIdPlace();    

    if(status){
      this.registerAssessment();
    }
  }
  
  getIdPlace(){
    return new Promise(resolve => {
      this.#place.httpPost$(this.placeAddress).subscribe({complete() {
        resolve(true)
      },});
    });
  }

  public registerAssessment(){
  
    this.assessmentValues.place_id = this.idPlace();
    this.assessmentValues.user_id  = this.#user.userId()?.id;
    
    console.log(this.assessmentValues);
    console.log(this.idPlace());
  }

  public modifiedFields(){
    this.placeAddress = this.place.value;
    this.placeAddress.name = this.temporaryName();

    this.assessmentValues = this.assessment.value;
    this.assessmentValues.assessment = this.numberStars();

    this.placeAddress.category_id = this.assessmentValues.category_id;
  }

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

  public receiveName(name: string){
    if(name == "")
      return;

    this.temporaryName.set(name);
    this.nextStep('step-2');
  }

  public setNumberStarts(stars: number){
    this.numberStars.set(stars);
  }

  public alreadyRegistered(status: boolean){
    this.placeRegistered.set(status)
  }

}


