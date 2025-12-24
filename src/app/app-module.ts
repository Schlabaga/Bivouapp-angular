import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { WelcomeComponent } from './welcome-component/welcome-component';
import { ExploreComponent } from './explore-component/explore-component';
import { SpotDetailComponent } from './spot-detail-component/spot-detail-component';
import { PublishSpotComponent } from './publish-spot-component/publish-spot-component';
import { FavoritesComponent } from './favorites-component/favorites-component';

@NgModule({
  declarations: [
    App,
    WelcomeComponent,
    ExploreComponent,
    SpotDetailComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublishSpotComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
