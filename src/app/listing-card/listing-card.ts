import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Spot} from '../models/spot.model';
import {RouterLink} from '@angular/router';
import { SpotService} from '../services/spot';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listing-card.html',
  styleUrls: ['./listing-card.scss']
})
export class ListingCardComponent {
  @Input({ required: true }) data!: Spot; // pour faire passer du parent à l'enfant
  // data! garantit que la donnée sera fournie par le parent
  constructor(private spotService:SpotService) {
  }

  onFavoriteClick(event:Event){
    // empêche la redirection vers les détails
    event.stopPropagation();

    // mettre en favoris
    this.spotService.toggleFavorite(this.data.id)

  }

}
