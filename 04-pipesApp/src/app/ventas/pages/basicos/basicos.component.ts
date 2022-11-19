import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [],
})
export class BasicosComponent implements OnInit {
  nombreLower: string = 'santos';
  nombreUpper: string = 'SANTOS';
  nombreCompleto: string = 'sAntOs mARtIneZ';

  fecha: Date = new Date();

  constructor() {}

  ngOnInit(): void {}
}
