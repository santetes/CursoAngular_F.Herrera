import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'lifecycle';
  mostrar: boolean = true;
  nombre: string = '';

  alternar() {
    this.mostrar = !this.mostrar;
  }
  reciboNombre(nombre: string) {
    this.nombre = nombre;
  }
}
