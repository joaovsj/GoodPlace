import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';

// Services
import { UserService } from '@services/user.service';
import { LocalDatePipe } from 'app/shared/pipes/local-date.pipe';
import { environment } from 'environments/environment';
import { concatMap, tap } from 'rxjs';
import { ToastService } from '@services/toast.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, NgClass, CommonModule, LocalDatePipe, ReactiveFormsModule],
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

  public finalizeRegister = signal<boolean>(false);

  public stepForm  = signal<string>('step-1'); // Step of the Form
  public stepBar   = signal<number>(1)          // step of the bar in bottom

  
  public user = this.#user.userId;
  public icons$ = this.#user.getIcons$();

  public dateCreated: any = this.user()?.created_at;
  public userId = atob(this.#Cookies.get('id'))
  public imageUser = signal<string>("");

  public formData!: FormData
  public isFileFill = signal<boolean>(false);

  public statusUpload = this.#user.statusUpload;
  public messageUpload = this.#user.messageUpload;


  public ngOnInit(){  
    this.formData = new FormData();
    this.#user.getUser$(this.userId).subscribe(()=>this.setNameImage()); 
    this.#user.getIcons$().subscribe();
    this.icons$.subscribe();


    setTimeout(()=>{
      console.log(this.user());
    },2000)


  }

  public nextStep(step: string){
    this.stepForm.set(step);
    this.stepBar.update((oldValue) => {
      return oldValue + 1
    })
  }

  public finalize(){  
    this.finalizeRegister.update(oldValue => !oldValue)
  }

  submit(){

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


