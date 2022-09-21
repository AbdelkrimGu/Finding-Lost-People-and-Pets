import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private AuthService: AuthService) { }

  ngOnInit(): void {
  }

  errors = [];
  loading=false;
  onSubmit(f: NgForm) {
    this.loading=true
    const registerObserver = {
      next: (x: any) => console.log('user created '),
      error: (err: any) =>  {this.errors = err.error;console.log('error ')}
    };
    this.AuthService.register(f.value).subscribe(registerObserver);

  }
}
