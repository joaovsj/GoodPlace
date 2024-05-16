import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  public isLogged = signal<boolean>(false)


  constructor(){
    const token = this.#cookieService.get('token')
    token != "" ? this.isLogged.set(true) : null; 

  }

  public logout(){
    this.#cookieService.deleteAll();
    this.#router.navigate(['/'])
  }

}
