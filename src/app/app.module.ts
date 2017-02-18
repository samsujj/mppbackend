import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ImageUploadModule } from 'ng2-imageupload';

import {routing, appRoutingProviders} from './routes';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { LeftComponent } from './left/left.component';
import { FooterComponent } from './footer/footer.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { ProfileComponent } from './profile/profile.component';
import { EditadminComponent } from './editadmin/editadmin.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { AddfoodComponent } from './addfood/addfood.component';
import { EditfoodComponent } from './editfood/editfood.component';
import { EditfoodcatComponent } from './editfoodcat/editfoodcat.component';
import { AddfoodcatComponent } from './addfoodcat/addfoodcat.component';
import { FoodcatlistComponent } from './foodcatlist/foodcatlist.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { EditrecipeComponent } from './editrecipe/editrecipe.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { LogoutComponent } from './logout/logout.component';
import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import {Ng2UploaderService} from "ng2-uploader/src/services/ng2-uploader";
//import {Ng2UploaderModule} from "ng2-uploader/src/module/ng2-uploader.module";
//import { Ng2UploaderModule } from 'ng2-uploader/ng2-uploader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    AdminlistComponent,
    LeftComponent,
    FooterComponent,
    AddadminComponent,
    ProfileComponent,
    EditadminComponent,
    FoodlistComponent,
    AddfoodComponent,
    EditfoodComponent,
    EditfoodcatComponent,
    AddfoodcatComponent,
    FoodcatlistComponent,
    AddrecipeComponent,
    EditrecipeComponent,
    RecipelistComponent,
    LogoutComponent,
    UPLOAD_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,routing
  ],
  providers: [appRoutingProviders,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
