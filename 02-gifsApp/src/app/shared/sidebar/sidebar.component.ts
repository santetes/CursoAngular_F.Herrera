import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private giftService:GifsService) {}

  get historial():string[]{
    return this.giftService.historial
  }

  buscar( item:string){
    
    this.giftService.buscarGifts(item)
  }

}
