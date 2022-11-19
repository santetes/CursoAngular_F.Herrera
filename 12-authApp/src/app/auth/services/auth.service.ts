import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError, of, tap } from 'rxjs';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = environment.baseUrl;
  private _usuario!: AuthResponse;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}

  registro(name: string, email: string, password: string) {
    const url = `${environment.baseUrl}/auth/new`;
    return this.http.post<AuthResponse>(url, { name, email, password }).pipe(
      tap((resp) => {
        if (resp.ok) {
          this._usuario = {
            ok: resp.ok,
            name: resp.name!,
            email: resp.email!,
            uid: resp.uid!,
          };

          localStorage.setItem('token', resp.token!);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err))
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(`${this._baseUrl}/auth`, {
        email,
        password,
      })
      .pipe(
        tap((resp) => {
          if (resp.ok) {
            this._usuario = {
              ok: resp.ok,
              name: resp.name!,
              email: resp.email!,
              uid: resp.uid!,
            };
            localStorage.setItem('token', resp.token!);
          }
        }),
        map((resp) => resp.ok),
        catchError((err) => of(err)) //Con esto capturamos el error que se obtiene en una petición incorrecta y lo "limpiamos" y retornamos un observable con la respuesta false
      );
  }

  validarToken() {
    const url = `${this._baseUrl}/auth/renew`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        if (resp.ok) {
          this._usuario = {
            ok: resp.ok,
            name: resp.name!,
            email: resp.email!,
            uid: resp.uid!,
          };

          localStorage.setItem('token', resp.token!);
          return true;
        } else {
          return false;
        }
      }),
      catchError((err) => of(false))
    );
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
