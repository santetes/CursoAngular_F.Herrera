import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `
      mat-card {
        margin-top: 30px;
        border: 2px solid #c2185b;
      }
      img {
        width: 95%;
        margin: 0 auto;
        border: 2px solid #fae27f;
        border-radius: 25px;
      }

      .amarillo {
        color: #fae27f;
      }
    `,
  ],
})
export class HeroeTarjetaComponent {
  @Input() heroe!: Heroe;

  constructor() {}
}
