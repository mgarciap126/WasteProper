import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client, IClient } from '../../services/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export default class Add {
  amount: number = 0;
  type: 'income' | 'expense' = 'income';
  message = '';

  constructor(private clientService: Client, private router: Router) {}

  addTransaction() {
    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
      this.message = 'No se ha detectado una sesión, porfavor inicia sesión o regístrate.';
      return;
    }

    const id = parseInt(clientId, 10);
    this.clientService.getClient(id).subscribe({
      next: (client: IClient) => {
        const updateRevenue = this.type === 'income'
        ? client.revenue + this.amount
        : client.revenue - this.amount;

      this.clientService.updateClient(id, { revenue: updateRevenue }).subscribe({
        next: () => {
          this.message = 'Transaccion registrada correctamente!';
          setTimeout(() => this.router.navigate(['/main']), 1000);
        },
        error: () => {
          this.message = 'Error al actualizar';
        }
      });
      },
      error: () => {
        this.message = 'Cliente no encontrado';
      }
    });
  }
}
