import { Userinfo } from './../SharedComponents/profile/userinfo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CLIENT_RENEG_LIMIT } from 'tls';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  confirmEmailUrl = "application/json"

  baseurl = "http://localhost:8081/api/";
  //baseurl = "http://localhost:7777/userservice/api/";

  constructor(private http: HttpClient, private _route: Router) { }

  login(model: any) {
    return this.http.post(this.baseurl + "login", model).pipe(
      map((Response: any) => {
        console.log("aaa"+Response)
        const user = Response;
        localStorage.setItem('token', user.access_token)
        localStorage.setItem('role', user.role)
        this._route.navigate(['persons'])
      }))
  }

  register(model: any) {
    return this.http.post(this.baseurl + 'user/save', model).pipe(
      map(() => {
        this._route.navigate(['persons'])
      }))
  }

  loggedin() {
    return !!localStorage.getItem('token')
  }
  logout(){
    localStorage.clear();
    this._route.navigate([''])
  }

  isadmin() {
    if (localStorage.getItem('role') == 'ROLE_ADMIN') {
      return true
    } else return false
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getinfouser():  Observable<Userinfo>{
    return this.http.get<Userinfo>(this.baseurl + 'user/infos')
  }

}


