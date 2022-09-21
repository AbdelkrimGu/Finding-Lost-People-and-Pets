import { Losts } from './../listof-losts/losts';
import { PeopleService } from './../../People/people.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listof-losts-found',
  templateUrl: './listof-losts-found.component.html',
  styleUrls: ['./listof-losts-found.component.css']
})
export class ListofLostsFoundComponent implements OnInit {

  founds: Losts[] = [];
  searchTerm: string;
  term: string;

  constructor(private PeopleService : PeopleService) { }

  ngOnInit(): void {
    this.PeopleService.getfounds().subscribe(
      data=>{
      this.founds=data;
      // this.founds["is_identified"]
      console.log(data);
      console.log(this.founds);
    })
  }
}
