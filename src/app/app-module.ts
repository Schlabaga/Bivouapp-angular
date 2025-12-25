import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { WelcomeComponent } from './welcome-component/welcome-component';
import { ExploreComponent } from './explore-component/explore-component';
import { SpotDetailComponent } from './spot-detail-component/spot-detail-component';
import { PublishSpotComponent } from './publish-spot-component/publish-spot-component';
import { FavoritesComponent } from './favorites-component/favorites-component';
import {ListingCard, ListingCardComponent} from './listing-card/listing-card';
import {Router, RouterOutlet} from '@angular/router';
@NgModule({
  declarations: [
    App,
    WelcomeComponent,
    SpotDetailComponent,
    FavoritesComponent,
    ListingCard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublishSpotComponent,
    ListingCardComponent,
    RouterOutlet
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
