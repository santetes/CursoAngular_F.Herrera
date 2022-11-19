import { Component } from '@angular/core';

@Component({
  selector: 'app-contador',
  template: `
    <h1>{{ titulo }}</h1>
    <h3>La base es: {{ base }}</h3>
    <button class="btn btn-info px-3 mx-3 border-danger" (click)="acumular(-base)">-{{ base }}</button>
    <span class="fs-3 fw-bold">{{ numero }}</span>
    <button class="btn btn-info px-3 mx-3 border-danger" (click)="acumular(base)">+{{ base }}</button>
  `,
})
export class ContadorComponent {
  titulo: string = 'Contador App';
  base: number = 2;
  numero: number = 10;

  acumular(valor: number) {
    this.numero += valor;
  }
}
