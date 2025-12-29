import { Injectable } from '@angular/core';
import { Spot } from '../models/spot.model';
import { Observable } from 'rxjs';

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
      isFavorite: false,
      location: 'Pyrénées'
    },


    {
      id: 3,
      title: 'Spot Vue Lac d\'Annecy',
      description: 'Réveil au bord de l\'eau avec un accès privé.',
      price: 55,
      rating: 4.7,
      distance: 8,
      imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600',
      services: ['Eau', 'Baignade'],
      isFavorite: true,
      location: 'Annecy, France'
    },
    {
      id: 4,
      title: 'Grange Rénovée en Toscane',
      description: 'Un cadre rustique au milieu des oliviers.',
      price: 28,
      rating: 4.9,
      distance: 120,
      imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=600',
      services: ['Feu', 'Douche'],
      isFavorite: false,
      location: 'Toscane, Italie'
    },
    {
      id: 5,
      title: 'Phare de Bretagne',
      description: 'Endroit insolite pour dormir sous les étoiles.',
      price: 60,
      rating: 4.9,
      distance: 30,
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600',
      services: ['Wifi', 'Électricité'],
      isFavorite: true,
      location: 'Brest, France'
    },
    {
      id: 6,
      title: 'Désert des Bardenas',
      description: 'Dépaysement garanti dans un décor de cinéma.',
      price: 20,
      rating: 4.7,
      distance: 250,
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600',
      services: ['Solaire'],
      isFavorite: false,
      location: 'Bardenas Reales, Espagne'
    }
  ];

  constructor() {}

  getSpots(): Observable<Spot[]> {
    return new Observable(observer => {
      observer.next(this.spots);
      observer.complete();
    });
  }

  addSpot(newSpot: Spot): void {
    this.spots.push(newSpot);
  }

  getSpotById(id: number): Observable<Spot | undefined> {
    return new Observable(observer => {
      const spot = this.spots.find(s => s.id === id);
      observer.next(spot);
      observer.complete();
    });
  }

  toggleFavorite(id: number) {
    this.getSpotById(id).subscribe(spot => {
      if (spot) {
        spot.isFavorite = !spot.isFavorite;

      }
    });
  }

}
