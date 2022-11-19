import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .hidden {
        display: none;
      }
    `,
  ],
})
export class AgregarComponent {
  mensaje: string = 'santos';
  color: string = 'red';

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  validaCampo(campo: string): boolean {
    return this.miFormulario.controls[campo].invalid;
  }

  cambiaMensaje(): void {
    if (this.mensaje === 'santos') {
      this.mensaje = 'peropaco';
    } else {
      this.mensaje = 'santos';
    }
  }

  cambiaColor() {
    this.color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
  }
}
