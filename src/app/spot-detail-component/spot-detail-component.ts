import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpotService} from '../services/spot';
import {Spot} from '../models/spot.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-spot-detail-component',
  standalone: false,
  templateUrl: './spot-detail-component.html',
  styleUrl: './spot-detail-component.scss',
})
export class SpotDetailComponent implements OnInit {

  id: string | null = '';
  spot: Spot | undefined;

  constructor(
    private route: ActivatedRoute,
    private spotService: SpotService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      // on s'abonne au flux de données
      this.spotService.getSpotById(Number(this.id)).subscribe(data => {
        this.spot = data;
      });
    }
  }

  goBack() {
    this.location.back();
  }
  onFavoriteClick(){

    this.spotService.toggleFavorite(Number(this.id))

  }
}
