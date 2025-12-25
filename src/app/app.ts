import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bivouapp');
  showNav = signal(true);

  constructor(private router: Router) {
    // Écouter les changements de route pour afficher/cacher le menu
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Cacher le menu sur la page publish et welcome
        this.showNav.set(
          !event.url.includes('/publish') &&
          !event.url.includes('/welcome')
        );
      });
  }
}
