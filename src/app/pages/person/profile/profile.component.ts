import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { concatMap, tap } from 'rxjs';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';

import { environment } from 'environments/environment';
import { LocalDatePipe } from 'app/shared/pipes/local-date.pipe';
// Services
import { UserService } from '@services/user.service';
import { ToastService } from '@services/toast.service';
import { ModalProfileComponent } from '@components/modal-profile/modal-profile.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent, 
    FooterComponent, 
    NgClass, 
    CommonModule, 
    LocalDatePipe, 
    ReactiveFormsModule, 
    FormsModule, 
    ModalProfileComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProfileComponent implements OnInit{

  #user     = inject(UserService);
  #Cookies  = inject(CookieService);
  #fb       = inject(FormBuilder);
  #toast = inject(ToastService);
  public url = signal<string>(environment.API+"/user/image")

  public icons = this.#fb.group({
    name:       ["", Validators.required],
    valueMedia: ["", Validators.required]
  })


  public finalizeRegister = signal<boolean>(false);
  
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

  public ngOnInit(){  
    this.formData = new FormData();
    this.#user.getUser$(this.userId).subscribe(()=>this.setNameImage()); 
    this.#user.getIcons$().subscribe();
    this.icons$.subscribe();
    this.#user.getCategories$().subscribe();
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

  public finalize(){  
    this.finalizeRegister.update(oldValue => !oldValue)
  }

}





