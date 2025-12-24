import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome-component/welcome-component';
import {ExploreComponent} from './explore-component/explore-component';
import {SpotDetailComponent} from './spot-detail-component/spot-detail-component';
import {PublishSpotComponent} from './publish-spot-component/publish-spot-component';
import {FavoritesComponent} from './favorites-component/favorites-component';

export const routes:  Routes= [
  {path:'', redirectTo: 'welcome', pathMatch:'full'}, // par défaut
  {path:'welcome', component:WelcomeComponent},
  {path:'explore', component:ExploreComponent},
  {path:'spot/:id', component:SpotDetailComponent},
  {path:'publish',component:PublishSpotComponent},
  {path:'favorites',component:FavoritesComponent},
  {path: '**', redirectTo: 'welcome'} // au cas où l'utilisateur tape n'importe quoi dans l'URL
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
