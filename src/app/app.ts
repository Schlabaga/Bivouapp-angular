import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
  // pour que l'espace de la navbar soit enlevé
  host: {
    '[class.has-nav]': 'showNav()'
  }
})
export class App {
  protected readonly title = signal('bivouapp');
  showNav = signal(true);

  constructor(private router: Router) {
    // Initialiser showNav à false au démarrage
    this.showNav.set(false);

    // On écoute les changements de route pour afficher/masquer la navbar
    // Le pipe filter permet de ne garder que les événements de type NavigationEnd
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // La navbar ne doit pas s'afficher sur welcome, publish et spot
        // On vérifie l'URL actuelle et on met à jour showNav en conséquence
        const url = event.url;
        this.showNav.set(
          url !== '/' &&
          !url.includes('/welcome') &&
          !url.includes('/publish') &&
          !url.includes('/spot')
        );
      });
  }
}
