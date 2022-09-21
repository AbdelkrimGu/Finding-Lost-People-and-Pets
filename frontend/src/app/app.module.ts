import { TokenInterceptor } from './token.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { HomeComponent } from './home/home.component';
import { HomePComponent } from './People/home-p/home-p.component';
import { HomeAComponent } from './Animals/home-a/home-a.component';
import { SwiperModule } from 'swiper/angular';
import { AdminComponent } from './admin/admin.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { MessagerieComponent } from './People/messagerie/messagerie.component';
import { AddlostComponent } from './People/addlost/addlost.component';
import { ProfileComponent } from './SharedComponents/profile/profile.component';
import { PostesComponent } from './People/postes/postes.component';
import { ListofLostsComponent } from './SharedComponents/listof-losts/listof-losts.component';
import { ListofLostsFoundComponent } from './SharedComponents/listof-losts-found/listof-losts-found.component';
import { PeopleRoutingModule } from './People/people-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddfoundComponent } from './People/addfound/addfound.component';
import { NotifierModule } from 'angular-notifier';
import { DetaillostComponent } from './SharedComponents/detaillost/detaillost.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomePComponent,
    HomeAComponent,
    AdminComponent,
    MessagerieComponent,
    AddlostComponent,
    ProfileComponent,
    PostesComponent,
    ListofLostsComponent,
    ListofLostsFoundComponent,
    AddfoundComponent,
    DetaillostComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthRoutingModule,
    AuthModule,
    SwiperModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    PeopleRoutingModule,
    NotifierModule,
    
  ],
  exports:[
    AppComponent,
    ],
  providers: [AuthGuard,{provide : HTTP_INTERCEPTORS,useClass : TokenInterceptor,multi: true},HomePComponent,ListofLostsComponent],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
