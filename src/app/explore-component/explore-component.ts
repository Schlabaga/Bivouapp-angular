import { Component } from '@angular/core';
import {SpotService} from '../services/spot';
import {Router} from '@angular/router';
import {Spot} from '../models/spot.model';
import {ListingCardComponent} from '../listing-card/listing-card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-explore-component',
  standalone: true,
  imports:[CommonModule, ListingCardComponent],
  templateUrl: './explore-component.html',
  styleUrl: './explore-component.scss',
})
export class ExploreComponent {


  spots: Spot[] = [];

  constructor(
    private spotService: SpotService,
    private router: Router){
  }


  ngOnInit() {
    this.spotService.getSpots().subscribe({
      next: (data) => {
        this.spots = data;
        console.log('Spots chargés :', this.spots);
      },
      error: (err) => console.error(err)
    });
  }

}
