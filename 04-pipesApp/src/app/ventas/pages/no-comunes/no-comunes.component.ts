import { Component } from '@angular/core';

import { interval } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styles: [
    `
      button {
        margin-right: 20px;
        margin-top: 15px;
      }
    `,
  ],
})
export class NoComunesComponent {
  nombre: string = 'Santos';
  genero: string = 'masculino';

  invitacionMapa: any = {
    masculino: 'invitarlo',
    femenino: 'inivitarla',
  };
  contadorMensajes: number = 3;
  mensajes: string[] = ['mensaje-1', 'mensaje-2', 'mensaje-3'];
  mensajesMapa: any = {
    '=0': 'No existen mensajes',
    '=1': ' Existe un mensaje',
    other: 'Existen # mensajes',
  };

  constructor() {}

  masculino() {
    this.nombre = 'Santos';
    this.genero = 'masculino';
  }
  femenino() {
    this.nombre = 'Leticia';
    this.genero = 'femenino';
  }
  menos() {
    if (this.contadorMensajes != 0) this.contadorMensajes--;
    this.mensajes.pop();
  }
  mas() {
    this.contadorMensajes++;
    this.mensajes.push(`Mensaje-${this.contadorMensajes}`);
  }

  //KeyValuePipe
  persona = {
    nombre: 'Santos',
    edad: 35,
    ciudad: 'valencia',
  };

  //Json Pipe
  heroes = [
    {
      nombre: 'superman',
      vulela: true,
    },
    {
      nombre: 'acuaman',
      vulela: false,
    },
    {
      nombre: 'spiderman',
      vulela: false,
    },
  ];

  //Async Pipe
  miObservable = interval(1000);

  //Con promesas
  miPromesa = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Se completó la promesa');
    }, 3000);
  });
}
