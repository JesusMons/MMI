import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// PrimeNG standalone
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { TipoPagoService } from '../../../../services/renta/tipo-pago';

@Component({
  selector: 'app-crear-tipo-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, Card, ButtonModule, InputTextModule, RouterModule],
  templateUrl: './crear-tipo-pago.html',
  styleUrls: ['./crear-tipo-pago.css'],
})
export class CrearTipoPago {
  nombre = '';
  loading = false;
  error = '';
  okMsg = '';

  private svc = inject(TipoPagoService);
  private router = inject(Router);

  guardar(): void {
    this.error = '';
    this.okMsg = '';

    if (!this.nombre.trim()) {
      this.error = 'El nombre es obligatorio';
      return;
    }

    this.loading = true;
    this.svc.create({ nombre: this.nombre }).subscribe({
      next: () => {
        this.loading = false;
        this.okMsg = 'Tipo de pago creado correctamente';
        setTimeout(() => this.router.navigate(['/tipos-pago']), 700);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.error = err?.error?.detail || 'Error al crear tipo de pago';
      },
    });
  }
}
