import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private AuthService: AuthService , private _route : Router) { }
  
  canActivate(): boolean {
    if (this.AuthService.loggedin()) {
      this._route.navigate([''])
      document.getElementById("details")?.scrollIntoView({behavior:"smooth"});
      return false
     } else {
       return true
    }
  }
  
}
