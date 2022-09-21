import { Losts } from './losts';
import { PeopleService } from './../../People/people.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-listof-losts',
  templateUrl: './listof-losts.component.html',
  styleUrls: ['./listof-losts.component.css']
})
export class ListofLostsComponent implements OnInit {

  losts: Losts[] = [];
  searchTerm: string;
  term: string;

  constructor(private PeopleService : PeopleService) { }

  ngOnInit(): void {
    this.PeopleService.getlosts().subscribe(
      data=>{
      this.losts=data;
      console.log(data);
    })
  }

  nblost(){
    this.PeopleService.getlosts().subscribe(
      data=>{
      this.losts=data;
    })
    var cpt=0
    this.losts.forEach(e=>{
      cpt++
    })
    return cpt
  }

}
