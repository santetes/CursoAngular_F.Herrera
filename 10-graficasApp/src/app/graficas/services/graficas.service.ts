import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraficasService {
  constructor(private http: HttpClient) {}

  obtenerData() {
    return this.http.get('http://localhost:3000/grafica').pipe(
      delay(1500),
      map((data) => {
        return {
          labels: Object.keys(data),
          values: Object.values(data),
        };
      })
    );
  }
}
