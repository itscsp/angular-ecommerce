import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent {
  rating = input<{
    rate: number,
    count: number
  }>()

  getStarRating(rate: number = 0) {
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5 ? 1 : 0; 
    const emptyStars = 5 - fullStars - halfStar; 
    return { fullStars, halfStar, emptyStars };
  }
}
