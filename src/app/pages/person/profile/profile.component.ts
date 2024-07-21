import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { concatMap, tap } from 'rxjs';

// Components
import { HeaderComponent } from '@components/header/header.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ModalProfileComponent } from '@components/modal-profile/modal-profile.component';
import { BoxPostComponent } from '@components/box-post/box-post.component';

import { environment } from 'environments/environment';
import { LocalDatePipe } from 'app/shared/pipes/local-date.pipe';

// Services
import { UserService } from '@services/user.service';
import { ToastService } from '@services/toast.service';
import { PostService } from '@services/post.service';


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
    ModalProfileComponent,
    BoxPostComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
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
  ]
})

export class ProfileComponent implements OnInit{

  #user     = inject(UserService);
  #Cookies  = inject(CookieService);
  #fb       = inject(FormBuilder);
  #toast    = inject(ToastService);
  #posts    = inject(PostService)

  public url = signal<string>(environment.API+"/user/image")

  public icons = this.#fb.group({
    name:       ["", Validators.required],
    valueMedia: ["", Validators.required]
  })


  public finalizeRegister = signal<boolean>(false);
  
  public user = this.#user.userId;
  public icons$ = this.#user.getIcons$();

  public posts: any = this.#posts.allPosts; // all posts

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

    this.#posts.httpGet$(this.userId).subscribe();


    // setTimeout(()=>{
    //   console.log(this.posts());
    // },4000)
  }

  // store the social media of user
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

  // update the name of user
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

  // update the social media of user
  removeIcon(icon: number){
    const allSocialMedia = this.user()?.social_media;
    allSocialMedia.splice(icon, 1);   

    this.user()!.social_media = allSocialMedia;
    return this.#user.update$(this.userId, this.user()).subscribe();
  }

  // method triggered when the user selected an image
  public onfileSelected(event: any){

    if(event.target.files.length > 0){

      const file = event.target.files[0]; 
      this.isFileFill.set(true);
      this.formData.append('image', file);
      this.formData.append('user_id', this.userId)
    } 
  }

  // method responsible for uploading file
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

  // method responsible to cancel upload
  public cancelUpload(){

    this.finalizeRegister.set(false);
    this.isFileFill.set(false);
    this.formData.delete("image");
    this.formData.delete("user_id");
  }

  // method responsible to define the image name
  public setNameImage(){
    this.user.update((oldValues: any)=>{
      this.imageUser.set(oldValues?.image.name)
      return oldValues;
    })
  }

  // method responsible to change the content on template if the user wants finalize register
  public finalize(){  
    this.finalizeRegister.update(oldValue => !oldValue)
  }

  // method responsible to get all posts and data user after input
  public reloadPosts(event: boolean){
    if(event){  
      this.#posts.httpGet$(this.userId).subscribe();
      this.#user.getUser$(this.userId).subscribe();
    }
  }

}





