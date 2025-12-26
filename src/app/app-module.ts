import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { WelcomeComponent } from './welcome-component/welcome-component';
import { SpotDetailComponent } from './spot-detail-component/spot-detail-component';
import { PublishSpotComponent } from './publish-spot-component/publish-spot-component';
import { FavoritesComponent } from './favorites-component/favorites-component';
import { ExploreComponent } from './explore-component/explore-component';
import { ProfileComponent } from './profile-component/profile-component';

@NgModule({
  declarations: [
    App,
    WelcomeComponent,
    SpotDetailComponent,
    FavoritesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublishSpotComponent,
    ExploreComponent
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
