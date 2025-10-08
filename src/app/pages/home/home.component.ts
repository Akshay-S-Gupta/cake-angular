import { Component } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, NgStyle],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  images = [1, 2, 3, 4, 5].map(i => this.imageService.getProductImage(i));
  banner = this.imageService.getBannerImage();
  constructor(private imageService: ImageService) { }
}


