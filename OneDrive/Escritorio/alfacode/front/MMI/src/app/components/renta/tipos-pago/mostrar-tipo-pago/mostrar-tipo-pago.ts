// src/app/components/renta/tipos-pago/mostrar-tipo-pago/mostrar-tipo-pago.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TipoPagoService, TipoPago } from '../../../../services/renta/tipo-pago';

@Component({
  selector: 'app-mostrar-tipo-pago',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, Card, ButtonModule],
  templateUrl: './mostrar-tipo-pago.html',
  styleUrls: ['./mostrar-tipo-pago.css'],
})
export class MostrarTipoPago implements OnInit {
  tipos: TipoPago[] = [];
  loading = false;
  error = '';

  constructor(private svc: TipoPagoService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: (data) => { this.tipos = data ?? []; this.loading = false; },
      error: (err) => { this.error = err?.error?.detail || 'No se pudieron cargar'; this.loading = false; }
    });
  }

  editar(id: number) { /* navegar */ }
  eliminar(id: number) { /* borrar */ }
}
