import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Spot} from '../models/spot.model';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-card.html',
  styleUrls: ['./listing-card.scss']
})
export class ListingCardComponent {
  @Input({ required: true }) data!: Spot;
}
