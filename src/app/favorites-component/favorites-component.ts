import { Component } from '@angular/core';
import {Spot} from '../models/spot.model';
import {SpotService} from '../services/spot';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorites-component',
  standalone: false,
  templateUrl: './favorites-component.html',
  styleUrl: './favorites-component.scss',
})
export class FavoritesComponent {


  spots: Spot[] = [];

  constructor(
    private spotService: SpotService,
    private router: Router) {
  }



  ngOnInit(): void {
    this.spotService.getSpots().subscribe({
      next: (data) => {
        data.forEach((spot) => {
          if(spot.isFavorite){
            this.spots.push(spot)
          }
        })
        console.log('Spots chargés :', this.spots);
      },
      error: (err) => console.error(err)
    });
  }



}
