import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css'],
})
export class PorCapitalComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];
  textoPlaceholder: string = '';

  constructor(private paisService: PaisService) {}

  buscarPais(termino: string) {
    this.termino = termino;
    this.hayError = false;
    this.paisService.buscarPaisPorCapital(this.termino).subscribe({
      next: (paises) => {
        this.paises = paises;
        this.termino = '';
        this.paisesSugeridos = [];
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
      },
    });
  }

  sugerencia(termino: string) {
    this.hayError = false;
    this.paises = [];

    this.paisService
      .buscarPaisPorCapital(termino)

      .subscribe({
        next: (paises) => (this.paisesSugeridos = paises.splice(0, 5)),
        error: (err) => (this.paisesSugeridos = []),
      });

    if (termino.length == 0) this.paisesSugeridos = [];
  }
}
