import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v2';

  get httpParams() {
    return new HttpParams().set(
      'fields',
      'flag,name,population,alpha2Code,capital'
    );
  }

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Pais[]> {
    const url = `${this.apiUrl}/name/${termino}`;

    return this.http.get<Pais[]>(url, { params: this.httpParams });
  }

  buscarPaisPorCapital(termino: string): Observable<Pais[]> {
    const url = `${this.apiUrl}/capital/${termino}`;

    return this.http.get<Pais[]>(url, { params: this.httpParams });
  }
  buscarPaisPorCodigo(id: string): Observable<Pais> {
    const url = `${this.apiUrl}/alpha/${id}`;

    return this.http.get<Pais>(url);
  }
  buscarPaisPorRegion(region: string): Observable<Pais[]> {
    const url = `${this.apiUrl}/regionalbloc/${region}`;
    return this.http.get<Pais[]>(url, { params: this.httpParams });
  }
}
