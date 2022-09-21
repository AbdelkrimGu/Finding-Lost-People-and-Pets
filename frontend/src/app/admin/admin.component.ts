import { AuthService } from './../auth/auth.service';
import { Users } from './users';
import { AdminService } from './admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  users: Users[] = [];

  div1:boolean=true;
  div2:boolean=false;
  div3:boolean=false;

  searchTerm: string;
  term: string;
  loading=true;

  constructor(private adminService : AdminService,private authService : AuthService) {
    
  }
  ngOnInit(): void {
    this.adminService.recupererusers().subscribe(
      data=>{
      this.users=data;
      this.loading=false
    })
   }

  Supprimeruser(email: any){
    this.loading=true
    this.adminService.supprimerusers(email).subscribe({
      next:(res)=>{
        this.ngOnInit()
      },
      error:()=>{
        alert("user can't be deleted")
      }
     });
  }

  Logout(){
    this.authService.logout();
  }

  

div1Function(){
    this.div1=true;
    this.div2=false;
    this.div3=false
}
div2Function(){
    this.div2=true;
    this.div1=false;
    this.div3=false
}
div3Function(){
    this.div3=true;
    this.div2=false;
    this.div1=false
}

}
