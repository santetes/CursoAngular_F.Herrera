import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    name: ['Test 3', [Validators.required]],
    email: ['test3@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registro() {
    const { name, email, password } = this.miFormulario.value;

    this.authService.registro(name, email, password).subscribe((valid) => {
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
