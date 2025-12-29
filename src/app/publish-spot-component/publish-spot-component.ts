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
export class PublishSpotComponent implements OnInit, OnDestroy {

  spotForm!: FormGroup;
  allServices: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private spotService: SpotService,
    private router: Router) {
    this.allServices = spotService.getAllServices();
  }



  ngOnInit(): void {
    window.scrollTo(0, 0);
    document.body.classList.add('no-scroll');
    this.spotForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['Sallanches'],
      note: [4, [Validators.min(1), Validators.max(5)]],
      price: [0, [Validators.min(0)]],
      services: [[]],
      imageUrl: ['/assets/images/default.jpeg'],
      type: 'bivouac',
      isFavorite: false
    });

  }

  toggleService(serviceId: string): void {
    const currentServices = this.spotForm.get('services')?.value as string[];

    if (currentServices.includes(serviceId)) {
      const newServices = currentServices.filter(id => id !== serviceId);
      this.spotForm.get('services')?.setValue(newServices);
    } else {
      currentServices.push(serviceId);
      this.spotForm.get('services')?.setValue(currentServices);
    }
  }

  onSubmit(): void {
    if (this.spotForm.valid) {
      const newSpot = {
        ...this.spotForm.value,
        id: Date.now(),
        rating: this.spotForm.value.note,
        distance: 0,
        imageUrl: 'assets/images/default.jpeg',
        isFavorite: false
      };
      this.spotService.addSpot(newSpot);
      console.log('Spot ajouté.');
      this.spotForm.reset();
      this.router.navigate(['explore']);
    }
  }



  ngOnDestroy(): void {
    document.body.classList.remove('no-scroll');
  }
}
