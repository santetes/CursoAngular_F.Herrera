import { Component } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
        user-select: none;
      }

      li:hover {
        background-color: #03c5fa;
      }
    `,
  ],
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      ruta: 'mapas/fullscreen',
      nombre: 'FullScreen',
    },
    {
      ruta: 'mapas/zoom-range',
      nombre: 'ZoomRange',
    },
    {
      ruta: 'mapas/marcadores',
      nombre: 'Marcadores',
    },
    {
      ruta: 'mapas/propiedades',
      nombre: 'Propiedades',
    },
  ];
}
