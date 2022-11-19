import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Coordenada {
  lng: number;
  lat: number;
}

interface MarcadorColor {
  color: string;
  marcador?: mapboxgl.Marker;
  centro?: mapboxgl.LngLat;
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
      .mapa-container {
        height: 100vh;
        width: 100vw;
      }
      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
      }
      .pointer {
        cursor: pointer;
      }
    `,
  ],
})
export class MarcadoresComponent implements OnInit, AfterViewInit {
  /* ---------- */
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomActual: number = 10;
  coordenadaActual: Coordenada = {
    lng: -0.35172,
    lat: 39.47019,
  };

  /* Arreglo de Marcadores */
  marcadores: MarcadorColor[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/outdoors-v11',
      center: this.coordenadaActual,
      maxZoom: 18,
      zoom: this.zoomActual,
    });

    this.cargarLocalStorage();
  }

  ngOnInit(): void {}

  nuevoMarcador() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const posicion = this.mapa.getCenter();

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat(posicion)
      .addTo(this.mapa)
      .on('dragend', () => {
        this.guardarEnLocalStorage();
      });

    this.marcadores.push({
      color,
      marcador: nuevoMarcador,
    });

    this.guardarEnLocalStorage();
  }

  irMarcador({ marcador }: MarcadorColor) {
    this.mapa.flyTo({
      center: marcador!.getLngLat(),
      zoom: 14,
    });
  }

  guardarEnLocalStorage() {
    const marcadoresStorage: MarcadorColor[] = [];

    this.marcadores.forEach((m) => {
      marcadoresStorage.push({
        color: m.color,
        centro: m.marcador!.getLngLat(),
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(marcadoresStorage));
  }

  cargarLocalStorage() {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const marcadoresStorage: MarcadorColor[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );

    marcadoresStorage.forEach((m) => {
      const nuevoMarcador = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa)
        .on('dragend', () => {
          this.guardarEnLocalStorage();
        });

      this.marcadores.push({
        color: m.color,
        centro: m.centro,
        marcador: nuevoMarcador,
      });
    });
  }

  borrarMarcador(indice: number) {
    this.marcadores[indice].marcador?.remove();
    this.marcadores.splice(indice, 1);
    this.guardarEnLocalStorage();
  }
}
