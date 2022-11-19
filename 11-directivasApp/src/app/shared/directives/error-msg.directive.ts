import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[ErrorMsg]',
})
export class ErrorMsgDirective implements OnInit {
  htmlElement: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _mensaje: string = 'este campo es requerido';

  @Input() set color(color: string) {
    this.htmlElement.nativeElement.style.color = color;
    this._color = color;
  }
  @Input() set mensaje(mensaje: string) {
    this.htmlElement.nativeElement.innerHTML = mensaje;
    this._mensaje = mensaje;
  }
  @Input() set valido(isValid: boolean) {
    if (!isValid) {
      this.htmlElement.nativeElement.classList.add('hidden');
    } else {
      this.htmlElement.nativeElement.classList.remove('hidden');
    }
  }

  get color(): string {
    return this._color;
  }
  get mensaje(): string {
    return this._mensaje;
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setClase();

    this.htmlElement.nativeElement.innerHTML = this.mensaje;
    this.htmlElement.nativeElement.style.color = this.color;
  }

  setClase() {
    this.htmlElement.nativeElement.classList.add('form-text');
  }
}
