import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent{

  #cookieService = inject(CookieService)  
  #router        = inject(Router);
  public isLogged = signal<boolean>(false);
  public public_token = signal<any>("");

  public showMenu = false;

  constructor(){
    const token = this.#cookieService.get('token')
   
    if(token != ""){
      this.isLogged.set(true)
      this.public_token.set(this.#cookieService.get('public_token'));
    }


    // token != "" ? this.isLogged.set(true) : null; 

  }

  public logout(){
  
    this.#cookieService.deleteAll();

    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

    // this.#router.navigate(['/login'])
    window.location.reload();
   
  }

}
