import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  miFormulario: FormGroup = this.fb.group({
    email: ['test1@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    const email = this.miFormulario.get('email')?.value;
    const password = this.miFormulario.get('password')?.value;

    this.authService.login(email, password).subscribe((valid) => {
      if (valid === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        //sweetAlert
        Swal.fire({
          title: valid.error.msg,
          icon: 'error',
          confirmButtonText: 'Atrás',
        });
      }
    });
  }
}
