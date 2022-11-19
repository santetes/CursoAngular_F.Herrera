import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap, Observable, of, timer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 80%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  encabezado: string = '';
  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];
  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    altImg: '',
  };

  constructor(
    private heroeService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): any {
    if (!this.router.url.includes('editar')) {
      this.encabezado = 'Agregar Heroe';
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroePorId(id)))
      .subscribe((heroe) => {
        this.heroe = heroe;
        this.encabezado = 'Editar Heroe';
      });
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroeService.actualizarHeroe(this.heroe).subscribe(() => {
        this.router.navigate(['/heroes/listado']);
        this.mostrarSnackBar('Heroe Actualizado');
      });
    } else {
      this.heroeService.agregarHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/listado']);
        this.mostrarSnackBar('registro creado');
      });
    }
  }

  borrar() {
    const dialogObjeto = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: { ...this.heroe },
    });

    dialogObjeto
      .afterClosed()
      .pipe(
        switchMap((resultado) => {
          return resultado
            ? this.heroeService.borrarHeroe(this.heroe)
            : timer(0);
        })
      )
      .subscribe(() => this.router.navigate(['/heroes/listado']));
  }

  cancelar() {
    this.router.navigate(['/heroes/listado']);
  }

  mostrarSnackBar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }

  mostrarConfirmacionBorrar() {}
}
