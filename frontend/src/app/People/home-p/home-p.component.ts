import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-p',
  templateUrl: './home-p.component.html',
  styleUrls: ['./home-p.component.css']
})
export class HomePComponent implements OnInit {

  constructor() { 
  }

  ngOnInit(): void {
  }

  chat:boolean=false;
  home:boolean=true;
  profile:boolean=false;
  lost:boolean=false;
  showchat(){
    this.chat=true;
    this.home=false;
    this.profile=false;
    this.lost=false;

  }
  showhome(){
    this.chat=false;
    this.home=true;
    this.profile=false;
    this.lost=false;
  }
  showprofile(){
    this.chat=false;
    this.home=false;
    this.profile=true;
    this.lost=false;

  }
  showlost(){
    this.chat=false;
    this.home=false;
    this.profile=false;
    this.lost=true;

  }

}
