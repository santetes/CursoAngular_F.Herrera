import { Component } from '@angular/core';

interface MenuItem {
  ruta: string;
  texto: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      ul {
        width: 60%;
      }
      li {
        cursor: pointer;
        user-select: none;
      }
    `,
  ],
})
export class MenuComponent {
  menu: MenuItem[] = [
    {
      ruta: '/graficas/barra',
      texto: 'Barras',
    },
    {
      ruta: '/graficas/barra-doble',
      texto: 'Gráficas Dobles',
    },
    {
      ruta: '/graficas/dona',
      texto: 'Dona',
    },
    {
      ruta: '/graficas/dona-http',
      texto: 'Dona Http',
    },
  ];

  constructor() {}
}
