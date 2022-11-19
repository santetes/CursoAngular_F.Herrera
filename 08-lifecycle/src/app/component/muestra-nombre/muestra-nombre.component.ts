import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-muestra-nombre',
  templateUrl: './muestra-nombre.component.html',
  styles: [],
})
export class MuestraNombreComponent implements OnInit, OnChanges {
  @Input() nombre!: string;

  changes = {};

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.changes = changes;
    console.log(changes);
  }

  ngOnInit(): void {}
}
