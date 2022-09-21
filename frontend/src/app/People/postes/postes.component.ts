import { Comments } from './comments';
import { PeopleService } from './../people.service';
import { Component, OnInit } from '@angular/core';
import { Poste } from './poste';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.css']
})
export class PostesComponent implements OnInit {

  constructor(private PeopleService: PeopleService) { this.hideme = {} }

  poste: Poste[]
  comments: Comments[]
  commentslist: boolean = false
  date = new Date();


  hideme = {};

  searchTerm: string;
  term: string;

  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [3, 6, 9, 12];

  ngOnInit(): void {
    this.fetchPosts()
    this.fetchComments()
  }

  showcomments(item) {
    this.hideme[item] == true ? this.hideme[item] = false : this.hideme[item] = true;
  }

  onSubmit(f: NgForm, idpost) {
    f.value["post_id"] = idpost
    f.value["comment_date"] = new Date()
    console.log(f.value);
    this.PeopleService.addcomment(f.value).subscribe(
      res => {
        f.reset()
        this.fetchComments()
      }
    )
  }

  openimage(event) {
   
    var imgsrc =event.target.src
    console.log(imgsrc);
    var modal = document.getElementById("myModal");
    var modalImg = modal.getElementsByTagName('img')[0];
    console.log(modalImg);
      modal.style.display = "block";
      modalImg.src= imgsrc;

  }
  closeimage(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  fetchPosts() {
    this.PeopleService.getpostes().subscribe(
      data => {
        this.poste = data;
      })
  }

  fetchComments() {
    this.PeopleService.getcomment().subscribe(
      data => {
        this.comments = data;
      })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchPosts();
    window.scroll(0, 0);
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
    window.scroll(0, 0);
  }

}


