import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http:HttpClient) { }

//baseurl="http://localhost:8081/api/"
baseurl="http://localhost:7777/userservice/api/"

recupererusers(): Observable<Users[]>{
return this.http.get<Users[]>(this.baseurl+'users')
}

supprimerusers(model: any){
  return this.http.delete(this.baseurl+'user/delete/?email='+model)
}

}
