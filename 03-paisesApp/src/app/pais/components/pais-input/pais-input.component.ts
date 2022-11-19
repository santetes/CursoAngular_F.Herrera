import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css'],
})
export class PaisInputComponent implements OnInit {
  termino: string = '';
  subject: Subject<string> = new Subject();

  @Input() textoPlaceholder: string = '';
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebouncer: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.subject.pipe(debounceTime(300)).subscribe((terminoDebouncer) => {
      this.onDebouncer.emit(terminoDebouncer);
    });
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada() {
    this.subject.next(this.termino);
  }
}
