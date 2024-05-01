import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgClass } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FormArray, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';

// Services
import { UserService } from '@services/user.service';
import { LocalDatePipe } from 'app/shared/pipes/local-date.pipe';
import { environment } from 'environments/environment';
import { concatMap, tap } from 'rxjs';
import { ToastService } from '@services/toast.service';
import { IPlace } from 'app/interfaces/IPlace';
import { IAssessment } from 'app/interfaces/IAssessment';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgClass, CommonModule, LocalDatePipe, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
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

export class ProfileComponent implements OnInit{


  #user     = inject(UserService);
  #Cookies  = inject(CookieService);
  #fb       = inject(FormBuilder);
  #toast = inject(ToastService);
  public url = signal<string>(environment.API+"/user/image")

  public icons = this.#fb.group({
    name: ["", Validators.required],
    valueMedia: ["", Validators.required]
  })

  public place: IPlace | any = this.#fb.group({
    name:          [""],
    cep:           ["", Validators.required],
    address:       ["", Validators.required],
    number:        ["", Validators.required],
    city:          ["", Validators.required],
    neighborhood:  ["", Validators.required],
    state:         ["", Validators.required],
    country:       ["", Validators.required],
  })


  public assessment: IAssessment | any = this.#fb.group({
    type:           ["", Validators.required],
    assessment:     ["", Validators.required],
    description:    ["", Validators.required], 
    user_id:        ["", Validators.required],
    place_id:       ["", Validators.required],
    details:        this.#fb.array([
      ['']    
    ])
  })

  public addNewDetail(detail: string, assessment: string){
    const detailsForm = this.assessment.get('details') as FormArray;
    const value = new FormControl([detail, assessment]);
    detailsForm.push(value);
  }

  public finalizeRegister = signal<boolean>(false);

  public stepForm  = signal<string>('step-1'); // Step of the Form
  public stepBar   = signal<number>(1)          // step of the bar in bottom

  public user = this.#user.userId;
  public icons$ = this.#user.getIcons$();

  public dateCreated: any = this.user()?.created_at;
  public userId = atob(this.#Cookies.get('id'))
  public imageUser = signal<string>("");

  // variables of upload file
  public formData!: FormData
  public isFileFill = signal<boolean>(false);

  // upload
  public statusUpload = this.#user.statusUpload;
  public messageUpload = this.#user.messageUpload;
  // form of register places
  public temporaryName = signal<String>("");
  public placeRegistered = signal<boolean>(false);
  public numberStars = signal<number>(0);
  public placeAddress: any = [];  


  // Categories   
  public categories = this.#user.categories;

  // Address
  public address: any = "";

  public ngOnInit(){  
    this.formData = new FormData();
    this.#user.getUser$(this.userId).subscribe(()=>this.setNameImage()); 
    this.#user.getIcons$().subscribe();
    this.icons$.subscribe();
    this.#user.getCategories$().subscribe();


    setTimeout(()=>{
      console.log(this.user());
      console.log(this.categories());
    },2000)


  }

  public nextStep(step: string){

    if(step == "step-final"){
      this.registerPlace();
    }

    this.stepForm.set(step);
    this.stepBar.update((oldValue) => {
      return oldValue + 1
    })
  }


  public registerPlace(){

    this.placeAddress = this.place.value;
    this.placeAddress.name = this.temporaryName();
    console.log(this.placeAddress);
  }


  /**
   * Find for one address by CEP number
   */
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

  /**
   * Receive the name of place
   * @param name  
   * 
   */
  public receiveName(name: string){
    this.temporaryName.set(name);
    this.nextStep('step-2');
  }


  setNumberStarts(stars: number){
    this.numberStars.set(stars);
  }

  /**
   * Check if the place is already registered
   * @param status 
   * 
   */
  public alreadyRegistered(status: boolean){

    console.log(status);
    this.placeRegistered.set(status)
  }

  public finalize(){  
    this.finalizeRegister.update(oldValue => !oldValue)
  }

  public submit(){

    if(this.icons.invalid)
      return;

    this.user.update((oldValues)=>{
      
      const objectIcons = this.icons.value;
      const valuesIcons = Object.values(objectIcons); // as array
      
      if(oldValues?.social_media === null){
        oldValues.social_media = [valuesIcons]

      } else{
        oldValues?.social_media.push(valuesIcons);         
      }

      return oldValues;
    })

    this.icons.reset();
    return this.#user.update$(this.userId, this.user()).subscribe();
  }

  public changeName(name: string){

    if(name === "" || name == null)
      return;

    this.user.update((oldValues)=>{
        
        oldValues!.name = name;


        console.log(oldValues);
        return oldValues;
    });


    this.#user.update$(this.userId, this.user()).subscribe();
    this.finalizeRegister.set(false);
  }

  removeIcon(icon: number){
 
    const allSocialMedia = this.user()?.social_media;
    allSocialMedia.splice(icon, 1);   

    this.user()!.social_media = allSocialMedia;
    return this.#user.update$(this.userId, this.user()).subscribe();

  }

  public onfileSelected(event: any){

    if(event.target.files.length > 0){

      const file = event.target.files[0]; 

      this.isFileFill.set(true);
      this.formData.append('image', file);
      this.formData.append('user_id', this.userId)
    } 
  }

  public send(){
    this.#user.upload$(this.formData)
      .pipe(
        tap((res)=>{

          if(res.status){
            this.#toast.success(res.message)
            this.isFileFill.set(false);

          }else{
            this.#toast.error(res.message)
          }
        }),
        concatMap(()=>this.#user.getUser$(this.userId)),
      ).subscribe((next)=>{
        this.setNameImage()   
      });
  }

  public cancelUpload(){

    this.finalizeRegister.set(false);
    this.isFileFill.set(false);
    this.formData.delete("image");
    this.formData.delete("user_id");
  }

  public setNameImage(){
    this.user.update((oldValues: any)=>{
      this.imageUser.set(oldValues?.image.name)
      return oldValues;
    })
  }

}


