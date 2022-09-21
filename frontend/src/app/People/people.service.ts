import { Losts } from './../SharedComponents/listof-losts/losts';
import { Comments } from './postes/comments';
import { Poste } from './postes/poste';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { Lost } from '../SharedComponents/detaillost/lost';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  // baseurl = "http://127.0.0.1:8000/"
  baseurl = "http://localhost:7777/persons/"

  private readonly notifier: NotifierService;

  
  constructor(private http: HttpClient,notifierService: NotifierService,private activatedRoute: ActivatedRoute,private _route: Router) { 
    this.notifier = notifierService;
  }
  lostinfo : Lost
  addlost(model: any) {
    return this.http.post(this.baseurl + "addlost/", model).pipe(
      map((Response: Lost) => {
        this.lostinfo=Response
      }))
  }

  
  addfound(model: any) {
    return this.http.post(this.baseurl + "addfound/", model).pipe(
      map((Response: Lost) => {
        this.lostinfo=Response
      }))
  }
  addpost(model: any) {
    return this.http.post(this.baseurl + "addpost/", model).pipe(
      map((Response: any) => {
        console.log(Response)
      }))
  }
  addcomment(model: any) {
    return this.http.post(this.baseurl + "addcomment/", model)
  }

  getpostes(): Observable<Poste[]> {
    return this.http.get<Poste[]>(this.baseurl + "postlist/")
  }
  getcomment(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.baseurl + "commentlist/")
  }
  getlosts(): Observable<Losts[]> {
    return this.http.get<Losts[]>(this.baseurl + "lostbyuser/")
  }
  getfounds(): Observable<Losts[]> {
    return this.http.get<Losts[]>(this.baseurl + "foundbyuser/")
  }
}
