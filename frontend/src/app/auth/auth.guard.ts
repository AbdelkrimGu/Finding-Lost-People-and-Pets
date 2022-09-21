import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AuthService: AuthService , private _route : Router) { }

  canActivate(): boolean {
    if (this.AuthService.loggedin() && this.AuthService.isadmin()) {
      return true
     } else {
      this._route.navigate([''])
      return false
    }
  }
 
  
}
