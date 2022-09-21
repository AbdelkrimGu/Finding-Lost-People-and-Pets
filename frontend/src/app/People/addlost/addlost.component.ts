import { PeopleService } from './../people.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Lost } from 'src/app/SharedComponents/detaillost/lost';

@Component({
  selector: 'app-addlost',
  templateUrl: './addlost.component.html',
  styleUrls: ['./addlost.component.css']
})
export class AddlostComponent implements OnInit {

  ischecked: boolean
  imageError: string;
  stringimage: any;
  load: boolean;
  imagenotd: boolean = false


  lostinfo: Lost

  private readonly notifier: NotifierService;

  constructor(private PeopleService: PeopleService, notifierService: NotifierService, private _route: Router, private activatedRoute: ActivatedRoute) {
    this.notifier = notifierService;


  }
  ngOnInit(): void {
    this.load = false
  }

  show(event) {
    event.target.checked ? this.ischecked = true : this.ischecked = false
  }

  onSubmit(f: NgForm) {
    this.load = true

    this.notifier.notify('info', 'traitement en cours..');
    f.value['image'] = this.stringimage
    const lostObserver = {
      next: (x: any) => {
        this.lostinfo = this.PeopleService.lostinfo

        const navigationExtras: NavigationExtras = {
          relativeTo: this.activatedRoute,
          state: {
            donnee: this.lostinfo,
          }
        };

        if (this.lostinfo.id == "Added succefuly") {
          this.notifier.notify('info', 'On vous informera quand une persone le trouve');
          this._route.navigate(['../home'], { relativeTo: this.activatedRoute });
        }
        else {
          this.notifier.notify("success", "On a trouver la personne confirmer si c'est la meme !");
          this._route.navigate(['../detaillost'], navigationExtras);
        }

      },
      error: (err: any) => {
        this.notifier.notify('error', 'On a pas reussi a detecter le visage choisisez une autre image');
        this.load = false
        this.imagenotd = true
      }
    };

    const lost = {
      "Address": f.value['Address'],
      "Family_Name": f.value['Family_Name'],
      "First_Name": f.value['First_Name'],
      "Gender": f.value['Gender'],
      "Phone": f.value['Phone'],
      "image": f.value['image'],
    }

    this.PeopleService.addlost(lost).subscribe(lostObserver);

    const postObserver = {
      next: (x: any) => {
        console.log('poste du perdu ajouté')
        this.notifier.notify('info', 'perdu avec poste ajouté');
      }
    };
    const post = {
      "title": f.value['title'],
      "content": f.value['content'],
      "image": f.value['image']
    }
    console.log(post);

    if (this.ischecked) {
      this.PeopleService.addpost(post).subscribe(postObserver);
    }
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
