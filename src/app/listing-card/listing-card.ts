import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  @Input() isFavoritePage: boolean = false;

  // ici on envoie l'id du spot au parent quand on le supprime des favoris
  @Output() removed = new EventEmitter<number>();

  // required: true veut dire que le parent DOIT fournir cette donnée
  @Input({ required: true }) data!: Spot;

  constructor(private spotService:SpotService) {
  }

  onFavoriteClick(event:Event){
    // stopPropagation empêche l'événement de remonter au parent
    // Sinon en cliquant sur le coeur, ça nous redirigerait vers la page de détail
    event.stopPropagation();

    // On change l'état favori du spot
    this.spotService.toggleFavorite(this.data.id)

    // Si on est sur la page des favoris ET que le spot n'est plus favori
    // alors on prévient le composant parent pour qu'il le retire de la liste
    // sinon il l'enlèverait de explore aussi
    if (this.isFavoritePage && !this.data.isFavorite) {
      this.removed.emit(this.data.id);
    }
  }
}
