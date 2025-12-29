import {Component, OnInit} from '@angular/core';
import {Spot} from '../models/spot.model';
import {SpotService} from '../services/spot';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorites-component',
  standalone: false,
  templateUrl: './favorites-component.html',
  styleUrl: './favorites-component.scss',
})
export class FavoritesComponent implements OnInit {
  spots: Spot[] = [];

  constructor(private spotService: SpotService) {}

  ngOnInit(): void {
    this.spotService.getSpots().subscribe({
      next: (data) => {
        // on filtre direct les favoris ici
        this.spots = data.filter(spot => spot.isFavorite);
        console.log('Favoris chargés :', this.spots);
      },
      error: (err) => console.error(err)
    });
  }


  handleRemove(id: number) {
    console.log('Suppression du spot id :', id);
    // on filtre le tableau pour que l'UI se mette à jour direct
    this.spots = this.spots.filter(s => s.id !== id);
  }
}
