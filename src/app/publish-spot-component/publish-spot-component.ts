import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SpotService} from '../services/spot';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-publish-spot-component',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './publish-spot-component.html',
  styleUrl: './publish-spot-component.scss',
})
export class PublishSpotComponent {

  spotForm!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private spotService: SpotService,
    private router: Router){
  }

  availableServices=[
    { id: 'fire', label: 'Feu autorisé', icon: 'assets/icons/fire.png' },
    { id: 'water', label: "Point d'eau", icon: "assets/icons/bath_tub.png" },
    { id: 'wifi', label: '4G / 5G', icon: 'assets/icons/wifi.png' },
  ]

  ngOnInit() {
    this.spotForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['Sallanches'],
      note: [4, [Validators.min(1), Validators.max(5)]],
      price: [0, [Validators.min(0)]],
      services: [[]]
    });
  }

  toggleService(serviceId:string){
    const currentServices= this.spotForm.get("services")?.value as string[];

    if (currentServices.includes(serviceId)) {
      const newServices = currentServices.filter(id => id !== serviceId);
      this.spotForm.get('services')?.setValue(newServices);
    } else {
      currentServices.push(serviceId);
      this.spotForm.get('services')?.setValue(currentServices);
    }
  }

  onSubmit(){
    if(this.spotForm.valid){
      // faut générer un id sinon ça crash
      const newSpot = {
        ...this.spotForm.value,
        id: Date.now(),
        rating: this.spotForm.value.note,
        distance: 0,
        imageUrl: 'assets/images/default.jpg',
        isFavorite: false
      };
      this.spotService.addSpot(newSpot);
      console.log("Spot ajouté.");
      this.spotForm.reset();
      this.router.navigate(['']) // aller sur l'accueil
    }
  }
}
