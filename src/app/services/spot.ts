import { Injectable } from '@angular/core';
import { Spot } from '../models/spot.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotService {


    private spots: Spot[] = [
    {
      id: 1,
      title: 'Mont des Pyrénées',
      description: 'Un spot magnifique avec vue imprenable.',
      price: 25,
      rating: 4.8,
      distance: 12,
      imageUrl: 'assets/images/pyrenees.jpg',
      services: ['Feu', 'Eau'],
      isFavorite: false
    }
  ];


    constructor() {
    }

    getSpots(): Observable<Spot[]> {
      return new Observable(observer => {
        observer.next(this.spots);
        observer.complete();
      });
    }

    addSpot(newSpot:Spot):void{
      this.spots.push(newSpot);
    }

  getSpotById(id: number): Observable<Spot | undefined> {
    return new Observable(observer => {
      const spot = this.spots.find(s => s.id === id);
      observer.next(spot);
      observer.complete();
    });
  }
}
