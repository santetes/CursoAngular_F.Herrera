import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css'],
})
export class PorRegionComponent {
  regionesObject: any = {
    EU: 'European Union',
    EFTA: 'European Free Trade Association',
    CARICOM: 'Caribbean Community',
    PA: 'Pacific Alliance',
    AU: 'African Union',
    USAN: 'Union of South American Nations',
    EEU: 'Eurasian Economic Union',
    AL: 'Arab League',
    ASEAN: 'Association of Southeast Asian Nations',
    CAIS: 'Central American Integration System',
    CEFTA: 'Central European Free Trade Agreement',
    NAFTA: 'North American Free Trade Agreement',
    SAARC: 'South Asian Association for Regional Cooperation',
  };

  regionActiva: string = '';
  hayError: boolean = false;
  paises: Pais[] = [];

  get regiones(): string[] {
    return Object.keys(this.regionesObject);
  }

  get descripcion(): string {
    return this.regionesObject[this.regionActiva] ?? '';
  }

  constructor(private paisService: PaisService) {}

  activarRegion(region: string) {
    this.regionActiva = region;
  }

  getClaseCss(region: string) {
    return region === this.regionActiva ? 'btn-primary' : 'btn-outline-primary';
  }

  buscar(region: string) {
    this.hayError = false;
    this.paisService.buscarPaisPorRegion(region).subscribe({
      next: (paises) => {
        this.paises = paises;
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
      },
    });
  }
}
