import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        padding: 20px;
      }
      .logOut {
        margin-left: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  // Esta es una forma totalmente válida de asignar datos a atributo en lugar de
  // crear el atributo y asignarle el valor en el NgOnInit
  get auth() {
    return this.authService.auth;
  }

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }
}
