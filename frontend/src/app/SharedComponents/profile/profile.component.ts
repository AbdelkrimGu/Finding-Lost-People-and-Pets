import { ListofLostsComponent } from './../listof-losts/listof-losts.component';
import { HomePComponent } from './../../People/home-p/home-p.component';
import { Userinfo } from './userinfo';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userinfo: Userinfo;
 
  constructor(private AuthService: AuthService,private HomePComponent:HomePComponent ,private listofLostsComponent:ListofLostsComponent ) { }

  ngOnInit(): void {
  
    this.AuthService.getinfouser().subscribe(data=>{
      this.userinfo=data;
      console.log(data );
    });

   var nblost =this.listofLostsComponent.nblost()
    console.log(nblost);
    console.log(this.userinfo );
  }

  logout(){
    this.AuthService.logout();
  }

  profile:boolean=true;
  edit_profile:boolean=false;
  showprofile(){
    this.edit_profile=false;
    this.profile=true;
  }
  showeditprofile(){
    this.edit_profile=true;
    this.profile=false;
  }

  showlost(){
    this.HomePComponent.showlost();

  }

}
