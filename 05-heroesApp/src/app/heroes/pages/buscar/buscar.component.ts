import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
    `
      img {
        width: 20vw;
        cursor: pointer;
      }
    `,
  ],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe;
  errorBusqueda: boolean = false;

  constructor(private heroeService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroeService.getSugerencias(this.termino).subscribe((heroes) => {
      if (heroes.length === 0) {
        this.errorBusqueda = true;
        this.heroes = [];
      } else {
        this.heroes = heroes;
        this.errorBusqueda = false;
      }
    });
  }
  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.termino = '';
      return;
    } else {
      const heroe: Heroe = event.option.value;
      this.termino = heroe.superhero;
      this.heroeService.getHeroePorId(heroe.id!).subscribe((heroe) => {
        this.heroeSeleccionado = heroe;
      });
    }
  }
}
