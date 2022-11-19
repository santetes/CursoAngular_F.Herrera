import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagenPipe',
  pure: false,
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroe): string {
    if (heroe.altImg) {
      return heroe.altImg;
    }
    if (heroe.id) {
      return `assets/heroes/${heroe.id}.jpg`;
    }
    return `assets/no-image.png`;
  }
}
