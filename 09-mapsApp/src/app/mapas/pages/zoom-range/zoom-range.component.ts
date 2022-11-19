import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

interface Coordenada {
  lng: number;
  lat: number;
}

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        height: 100vh;
        width: 100vw;
      }
      .row {
        background-color: white;
        width: 400px;
        border-radius: 5px;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        z-index: 999;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef;
  zoomActual: number = 10;
  coordenadaActual: Coordenada = {
    lng: -0.35172,
    lat: 39.47019,
  };

  constructor() {}
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('move', () => {});
  }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.coordenadaActual,
      maxZoom: 18,
      zoom: this.zoomActual,
    });

    this.mapa.on('zoom', () => (this.zoomActual = this.mapa.getZoom()));
    this.mapa.on('move', () => (this.coordenadaActual = this.mapa.getCenter()));
  }

  zoomOut() {
    this.mapa.zoomOut();
  }
  zoomIn() {
    this.mapa.zoomIn();
  }
  leyendoRange(zoom: string) {
    this.mapa.zoomTo(Number(zoom));
  }
}
