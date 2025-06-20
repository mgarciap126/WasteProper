import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../services/client';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: '' // sin interfaz porque actúa automáticamente
})
export default class Logout implements OnInit {
  constructor(private client: Client, private router: Router) {}

 ngOnInit(): void {
  if (this.client.currentUser) {
    this.client.deleteClient(this.client.currentUser.id).subscribe({
      next: () => {
        this.client.currentUser = null;
        localStorage.removeItem('usuario_actual');
        alert('Has cerrado sesión correctamente.');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Error al eliminar el cliente:', err);
        alert('Hubo un problema al cerrar sesión.');
      }
    });
  } else {
    this.router.navigate(['/login']);
  }
}

}

