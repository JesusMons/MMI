// src/app/components/renta/estados/mostrar-estado/mostrar-estado.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// PrimeNG
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

// Servicio
import { EstadoService, Estado } from '../../../../services/renta/estados';

@Component({
  selector: 'app-mostrar-estado',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, Card, ButtonModule],
  templateUrl: './mostrar-estado.html',
  styleUrls: ['./mostrar-estado.css'],
})
export class MostrarEstado implements OnInit {
  estados: Estado[] = [];
  loading = false;
  error = '';

  constructor(private estadoService: EstadoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarEstados();
  }

  cargarEstados(): void {
    this.loading = true;
    this.estadoService.list().subscribe({
      next: (data) => {
        this.estados = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar estados', err);
        this.error = 'No se pudieron cargar los estados';
        this.loading = false;
      },
    });
  }

  crearEstado(): void {
    this.router.navigate(['/estados/crear']);
  }

  editarEstado(id?: number): void {
    if (!id) return;
    this.router.navigate(['/estados/editar', id]);
  }

  eliminarEstado(id?: number): void {
    if (!id) return;
    const ok = confirm('¿Seguro que deseas eliminar este estado?');
    if (!ok) return;

    this.estadoService.delete(id).subscribe({
      next: () => {
        this.estados = this.estados.filter((e) => e.id !== id);
        alert('Estado eliminado correctamente.');
      },
      error: (err) => {
        console.error('Error al eliminar estado', err);
        alert('No se pudo eliminar el estado.');
      },
    });
  }
}
