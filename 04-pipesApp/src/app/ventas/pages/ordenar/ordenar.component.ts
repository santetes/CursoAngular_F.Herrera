import { Component } from '@angular/core';
import { Color, Heroes } from '../../interfaces/ventas.interface';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.component.html',
  styles: [
    `
      p-button {
        margin-right: 10px;
      }
    `,
  ],
})
export class OrdenarComponent {
  enMayusculas: boolean = false;
  tipoOrdenacion: string = '';
  constructor() {}

  cambiar(valorCambio: string) {
    if (valorCambio === 'nombre') {
      this.tipoOrdenacion = 'nombre';
    }
    if (valorCambio === 'vuela') {
      this.tipoOrdenacion = 'vuela';
    }
    if (valorCambio === 'mayusculas') {
      this.enMayusculas = this.enMayusculas ? false : true;
    }
    if (valorCambio === 'color') {
      this.tipoOrdenacion = 'color';
    }
  }

  heroes: Heroes[] = [
    {
      nombre: 'superman',
      vuela: true,
      color: Color.azul,
    },
    {
      nombre: 'batman',
      vuela: false,
      color: Color.negro,
    },
    {
      nombre: 'robin',
      vuela: false,
      color: Color.verde,
    },
    {
      nombre: 'daredevil',
      vuela: false,
      color: Color.rojo,
    },
    {
      nombre: 'linterna verde',
      vuela: true,
      color: Color.verde,
    },
  ];
}
