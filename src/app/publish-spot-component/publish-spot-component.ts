import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SpotService} from '../services/spot';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publish-spot-component',
  standalone: true,
  imports:[ReactiveFormsModule],
  templateUrl: './publish-spot-component.html',
  styleUrl: './publish-spot-component.scss',
})
export class PublishSpotComponent {

  spotForm!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private spotService: SpotService) {
  }

  availableServices=[
    { id: 'fire', label: 'Feu autorisé', icon: 'assets/icons/fire.png' },
    { id: 'water', label: 'Point d’eau', icon: "assets/icons/bath_tub.png" },
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

  // gérer les cases à cocher
  toggleService(serviceId:string){
    // on récup l'état actuel
    const currentServices= this.spotForm.get("services")?.value as string[];

    if (currentServices.includes(serviceId)) {
      // on veut l'enlever
      const newServices = currentServices.filter(id => id !== serviceId);
      this.spotForm.get('services')?.setValue(newServices);
    } else {
      currentServices.push(serviceId); // On ajoute l'élément dans le tableau
      this.spotForm.get('services')?.setValue(currentServices);
    }
  }

  onSubmit(){
    if(this.spotForm.valid){
      this.spotService.addSpot(this.spotForm.value);
      console.log("Spot ajouté.");
      this.spotForm.reset();
    }
  }
}
