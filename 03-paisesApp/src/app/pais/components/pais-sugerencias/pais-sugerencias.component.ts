import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-sugerencias',
  templateUrl: './pais-sugerencias.component.html',
  styleUrls: ['./pais-sugerencias.component.css'],
})
export class PaisSugerenciasComponent {
  @Input() paisesSugeridos: Pais[] = [];
  @Input() tipo: string = '';
  @Output() onSeleccionSugerido: EventEmitter<string> = new EventEmitter();

  constructor() {}

  buscar(pais: Pais) {
    this.paisesSugeridos = [];

    if (this.tipo == 'pais') {
      this.onSeleccionSugerido.emit(pais.name);
    } else {
      this.onSeleccionSugerido.emit(pais.capital);
    }
  }
}
