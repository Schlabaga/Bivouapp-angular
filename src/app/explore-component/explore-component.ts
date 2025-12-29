import { Component, OnInit } from '@angular/core';
import { SpotService } from '../services/spot';
import { Router } from '@angular/router';
import { Spot } from '../models/spot.model';
import { ListingCardComponent } from '../listing-card/listing-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore-component',
  standalone: true,
  imports: [CommonModule, ListingCardComponent],
  templateUrl: './explore-component.html',
  styleUrl: './explore-component.scss',
})
export class ExploreComponent implements OnInit {

  selectedSection: string = 'Bivouac';

  spots: Spot[] = [];

  constructor(
    private spotService: SpotService,
    private router: Router) {
  }

  select(section: string): void {
    this.selectedSection = section;
  }

  ngOnInit(): void {
    this.spotService.getSpots().subscribe({
      next: (data) => {
        this.spots = data;
        console.log('Spots chargés :', this.spots);
      },
      error: (err) => console.error(err)
    });
  }

}
