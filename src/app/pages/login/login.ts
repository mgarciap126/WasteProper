import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../services/client';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export default class Login {
  contactEmail = '';
  error = '';
  loading = false;

  constructor(private client: Client, private router: Router) {}
  login() {
    this.error = '';
    this.loading = true;

    this.client.loginByEmail(this.contactEmail).subscribe({
      next: user => {
        this.loading = false;
        if (user) {
          alert(`¡Bienvenido, ${user.name}!`);
          this.router.navigate(['/profile']); // redirige al perfil
        } else {
          this.error = 'Usuario no encontrado.';
        }
      },
      error: err => {
        this.loading = false;
        this.error = 'Error en la conexión. Intenta de nuevo.';
        console.error(err);
      }
    });
  }
}
