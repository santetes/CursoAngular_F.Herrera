import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/ventas.interface';

@Pipe({
  name: 'ordenar',
})
export class OrdenarPipe implements PipeTransform {
  transform(heroes: Heroes[], ordenarPor: string = 'no ordenar'): Heroes[] {
    if (ordenarPor === 'nombre') {
      heroes = heroes.sort((a, b) => {
        return a.nombre > b.nombre ? 1 : -1;
      });
    }
    if (ordenarPor === 'vuela') {
      heroes = heroes.sort((a, b) => {
        return a.vuela > b.vuela ? 1 : -1;
      });
    }
    if (ordenarPor === 'color') {
      heroes = heroes.sort((a, b) => {
        return a.color > b.color ? 1 : -1;
      });
    }

    return heroes;
  }
}
