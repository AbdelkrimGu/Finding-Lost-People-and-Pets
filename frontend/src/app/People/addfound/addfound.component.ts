import { Lost } from './../../SharedComponents/detaillost/lost';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { PeopleService } from './../people.service';


@Component({
  selector: 'app-addfound',
  templateUrl: './addfound.component.html',
  styleUrls: ['./addfound.component.css']
})
export class AddfoundComponent implements OnInit {

  load: boolean;
  imagenotd: boolean = false

  private readonly notifier: NotifierService;

  constructor(private PeopleService: PeopleService, notifierService: NotifierService, private _route: Router, private activatedRoute: ActivatedRoute) {
    this.notifier = notifierService;

  }
  ngOnInit(): void {
    this.load = false

  }

  imageError: string;
  stringimage: any;


  lostinfo:Lost

  

  onSubmit(f: NgForm) {
    this.load = true
    f.value['image'] = this.stringimage
    this.notifier.notify('info', 'Traitement en cours');
    const Observer = {
      next: (x: any) => {
        this.load = false
        this.lostinfo= this.PeopleService.lostinfo

        const navigationExtras: NavigationExtras = {
                  relativeTo: this.activatedRoute,
                  state: {
                    donnee: this.lostinfo,
                  }
                };

        if(this.lostinfo.id=="Added succefuly"){
          this.notifier.notify('info', 'On vous informera quand une persone le trouve');
          this._route.navigate(['../home'], {relativeTo: this.activatedRoute});
        }
        else{
          this.notifier.notify("success", "On a trouver la personne confirmer si c'est la meme !");
          this._route.navigate(['../detaillost'], navigationExtras);
        }
         
      },
      error: (err: any) => {
        this.notifier.notify('error', 'On a pas reussi a detecter le visage choisisez une autre image');
        this.load = false
        console.log(err)
        this.imagenotd = true
      }
    };

    this.PeopleService.addfound(f.value).subscribe(Observer);
    console.log(f.value)

  }

  fileChangeEvent(fileInput: any) {
    this.imagenotd = false
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          // console.log(img_height, img_width);

          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.stringimage = imgBase64Path
            // console.log(this.stringimage)

          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

}
