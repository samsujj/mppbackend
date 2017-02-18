import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent }  from './about/about.component';
import { ContactComponent }  from './contact/contact.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {LeftComponent} from "./left/left.component";
import { AdminlistComponent } from './adminlist/adminlist.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { EditadminComponent } from './editadmin/editadmin.component';
import { FoodcatlistComponent } from './foodcatlist/foodcatlist.component';
import { AddfoodcatComponent } from './addfoodcat/addfoodcat.component';
import { EditfoodcatComponent } from './editfoodcat/editfoodcat.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { AddfoodComponent } from './addfood/addfood.component';
import { EditfoodComponent } from './editfood/editfood.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipelistComponent } from './recipelist/recipelist.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { EditrecipeComponent } from './editrecipe/editrecipe.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
//import { AppAbout }  from './pages/about/app.about';

const appRoutes: Routes = [
    // { path: '/**',component: AppComponent},
    //{ path: '/*',component: AppComponent},
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent},
    { path: 'logout', component: LogoutComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'admin-list', component: AdminlistComponent},
    { path: 'add-admin', component: AddadminComponent},
    { path: 'edit-admin/:id', component: EditadminComponent},
    { path: 'recipe-category-list', component: FoodcatlistComponent},
    { path: 'add-recipe-category', component: AddfoodcatComponent},
    { path: 'edit-recipe-category/:id', component: EditfoodcatComponent},
    { path: 'food-list', component: FoodlistComponent},
    { path: 'add-food', component: AddfoodComponent},
    { path: 'edit-food/:id', component: EditfoodComponent},
    { path: 'recipe-list', component: RecipelistComponent},
    { path: 'add-recipe', component: AddrecipeComponent},
    { path: 'edit-recipe/:id', component: EditrecipeComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'header', component: HeaderComponent,outlet:'header'},
    { path: 'footer', component: FooterComponent,outlet:'footer'},
    { path: 'left', component: LeftComponent,outlet:'left'}




];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });