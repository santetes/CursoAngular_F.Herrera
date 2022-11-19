import { Component, Input,  } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styles: [
  ]
})
export class PersonajesComponent {

  get personajes():Personaje[]{
    return this.dbzService.personajes 
  }

  constructor( private dbzService:DbzService){}

}
