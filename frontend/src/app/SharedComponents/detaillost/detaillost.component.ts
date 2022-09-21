import { MessagerieService } from './../../People/messagerie/messagerie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lost } from './lost';

@Component({
  selector: 'app-detaillost',
  templateUrl: './detaillost.component.html',
  styleUrls: ['./detaillost.component.css']
})
export class DetaillostComponent implements OnInit {
  lost: Lost;
  constructor(private _route: Router, private messagerieService: MessagerieService, private activatedRoute: ActivatedRoute) {

    const navigation = this._route.getCurrentNavigation();
    const state = navigation.extras.state as {
      donnee: Lost,
    };
    this.lost = state.donnee;
    console.log(this.lost);
  }

  ngOnInit(): void {
  }

  contact() {
    
    const receiverId = {
      "receiverId": this.lost.All.by
    }
    this.messagerieService.addConversation(receiverId)

    setTimeout(() => {
      this._route.navigate(['../chat'], { relativeTo: this.activatedRoute });
    },
      1000);


    
  }

}
