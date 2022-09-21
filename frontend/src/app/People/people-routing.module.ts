import { HomePComponent } from './home-p/home-p.component';
import { ListofLostsFoundComponent } from './../SharedComponents/listof-losts-found/listof-losts-found.component';
import { ListofLostsComponent } from './../SharedComponents/listof-losts/listof-losts.component';
import { AddlostComponent } from './addlost/addlost.component';
import { PostesComponent } from './postes/postes.component';
import { ProfileComponent } from './../SharedComponents/profile/profile.component';
import { MessagerieComponent } from './messagerie/messagerie.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component: PostesComponent},
  // {path:'persons/Home',component: PostesComponent ,
  // children: [
    
  //   { path: 'profile', component: ProfileComponent, outlet: 'route1' },
  //   { path: 'Chat', component: MessagerieComponent, outlet: 'route2' },
  //   { path: 'AddLost', component: AddlostComponent, outlet: 'route3' }
  // ] },


  
  // {path:'persons/Profile',component: ProfileComponent  },
  // {path:'persons/Chat',component: MessagerieComponent },
  // {path:'persons/AddLost',component: AddlostComponent },
  // {path:'persons/Losts',component: ListofLostsComponent },
  // {path:'persons/Found',component: ListofLostsFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
