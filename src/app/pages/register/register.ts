import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client, IClient } from '../../services/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export default class Register {
  name = '';
  contactEmail = '';
  revenue: number | null = null;
  startDate = '';

  constructor(private clientService: Client, private router: Router) {}

  // metodo para registrar un usuario
  register() {
    if (!this.name || !this.contactEmail || this.revenue === null || !this.startDate) {
      alert('Porfavor no dejes campos vacíos');
      return;
    }

    const newClient: Partial<IClient> = {
      name: this.name,
      contactEmail: this.contactEmail,
      revenue: this.revenue,
      startDate: this.startDate
    };

    // una vez se ha creado el usuario o se ha registrado, redirige a /login para la identificacion
    this.clientService.createClient(newClient).subscribe({
      next: () => {
        alert('Se ha completado el registro satisfactoriamente!');
        this.router.navigate(['/login']);
      },
      error: (err) => alert('Error en el registro: '+err.message)
    });
  }
}
