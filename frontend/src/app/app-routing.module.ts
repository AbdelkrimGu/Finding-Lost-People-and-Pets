import { DetaillostComponent } from './SharedComponents/detaillost/detaillost.component';
import { ListofLostsFoundComponent } from './SharedComponents/listof-losts-found/listof-losts-found.component';
import { ListofLostsComponent } from './SharedComponents/listof-losts/listof-losts.component';
import { AddfoundComponent } from './People/addfound/addfound.component';
import { PostesComponent } from './People/postes/postes.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePComponent } from './People/home-p/home-p.component';
import { HomeAComponent } from './Animals/home-a/home-a.component';
import { ProfileComponent } from './SharedComponents/profile/profile.component';
import { MessagerieComponent } from './People/messagerie/messagerie.component';
import { AddlostComponent } from './People/addlost/addlost.component';

const routes: Routes = [
  {path:'', component: HomeComponent },
  {path:'persons', component: HomePComponent ,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: PostesComponent, outlet: 'main'  },
    { path: 'profile', component: ProfileComponent, outlet: 'main'  },
    { path: 'chat', component: MessagerieComponent, outlet: 'main' },
    { path: 'addLost', component: AddlostComponent, outlet: 'main' },
    { path: 'addFound', component: AddfoundComponent, outlet: 'main' },
    { path: 'detaillost', component: DetaillostComponent, outlet: 'main' },
    { path: 'Lostlist', component: ListofLostsComponent, outlet: 'main' },
    { path: 'Foundlist', component: ListofLostsFoundComponent, outlet: 'main' }
  ]  },
  {path:'pets', component: HomeAComponent},
  {path:'admin', component: AdminComponent , canActivate: [AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
