import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  //Nota: el signo de interrogación permite decirle a 
  //typescript que la propiedad indicada nunca va ser nula
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>

  constructor(private gifsService:GifsService){}

  buscar(){
    let value = this.txtBuscar.nativeElement.value
    if(value.trim().length===0){
      return
    }
    this.txtBuscar.nativeElement.value = ''

    this.gifsService.buscarGifts(value)

  }

}
