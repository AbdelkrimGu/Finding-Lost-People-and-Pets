import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {}
  
  errors = [];
  loading=false;

  onSubmit(f: NgForm) {
    this.loading=true
    const loginObserver = {
      next: (x: any) => {
        console.log('user logged in ')
      },
      error: (err: any) =>{ this.errors = err.error
      console.log(err) }
    };
    this.AuthService.login(f.value).subscribe(loginObserver);
  }

}
