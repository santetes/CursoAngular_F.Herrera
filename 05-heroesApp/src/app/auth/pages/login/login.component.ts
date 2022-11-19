import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .container {
        width: 100%;
        height: 70%;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login().subscribe((respuesta) => {
      console.log(respuesta);
      if (respuesta.id) {
        this.router.navigate(['/heroes']);
      }
    });

    //Verificar autenticación en BackEnd
    //devolverá un Usuario
  }

  loginSinAutnticar() {
    this.router.navigate(['/heroes']);
  }
}
