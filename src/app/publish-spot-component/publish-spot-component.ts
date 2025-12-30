import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpotService } from '../services/spot';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-publish-spot-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './publish-spot-component.html',
  styleUrl: './publish-spot-component.scss',
})
export class PublishSpotComponent implements OnInit {

  // FormGroup permet de gérer un formulaire avec plusieurs champs
  // Le point d'exclamation dit à TypeScript qu'on va l'initialiser après
  spotForm!: FormGroup;
  allServices: any[] = [];
  private isMobile: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private spotService: SpotService,
    private router: Router) {
    this.allServices = spotService.getAllServices();
  }

  ngOnInit(): void {
    // Remonter en haut de la page au chargement
    // car il y avait confusion avec le scroll des autres pages
    window.scrollTo(0, 0);

    // Construction du formulaire avec FormBuilder
    this.spotForm = this.formBuilder.group({
      title: ['', [Validators.required]], // Champ obligatoire
      description: ['', [Validators.required]],
      location: ['Sallanches'],
      note: [4, [Validators.min(1), Validators.max(5)]], // Entre 1 et 5
      price: [0, [Validators.min(0)]], // Prix positif
      services: [[]], // Tableau vide par défaut
      imageUrl: ['/assets/images/default.jpeg'],
      type: 'bivouac',
      isFavorite: false
    });
  }

  // Ajoute ou retire un service de la liste sélectionnée
  toggleService(serviceId: string): void {
    // On récupère le tableau actuel des services cochés
    const currentServices = this.spotForm.get('services')?.value as string[];

    // Si le service est déjà dans la liste on l'enlève
    if (currentServices.includes(serviceId)) {
      const newServices = currentServices.filter(id => id !== serviceId);
      this.spotForm.get('services')?.setValue(newServices);
    } else {
      // Sinon on l'ajoute
      currentServices.push(serviceId);
      this.spotForm.get('services')?.setValue(currentServices);
    }
  }

  onSubmit(): void {
    // On vérifie que le formulaire est valide (tous les Validators sont OK)
    if (this.spotForm.valid) {
      // On crée un nouvel objet spot en prenant toutes les valeurs du formulaire
      const newSpot = {
        ...this.spotForm.value, // Le spread operator copie tous les champs
        id: Date.now(), // ID unique basé sur le timestamp
        rating: this.spotForm.value.note,
        distance: 0,
        imageUrl: 'assets/images/default.jpeg',
        isFavorite: false
      };

      // On ajoute le spot au service
      this.spotService.addSpot(newSpot);
      console.log('Spot ajouté.');

      // On réinitialise le formulaire et on redirige vers explore
      this.spotForm.reset();
      this.router.navigate(['explore']);
    }
  }
}
