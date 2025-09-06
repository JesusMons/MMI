import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

// PrimeNG (Angular 20)
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { CrearRecursoDto } from '../../../../models/userI';
import { RecursoService } from '../../../services/recurso';

@Component({
  selector: 'app-mostrar-recurso',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, Card, ButtonModule], // 👈 quitado Table
  templateUrl: './mostrar-recurso.html',
  styleUrls: ['./mostrar-recurso.css']
})
export class MostrarRecurso implements OnInit {
  recursos: CrearRecursoDto[] = [];
  loading = false;
  error = '';

  constructor(
    private recursoService: RecursoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRecursos();
  }

  cargarRecursos(): void {
    this.loading = true;
    this.error = '';
    this.recursoService.getAll().subscribe({
      next: (data) => {
        this.recursos = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar recursos', err);
        this.error = err?.error?.detail || 'No se pudieron cargar los recursos.';
        this.loading = false;
      }
    });
  }

  crearRecurso(): void {
    this.router.navigate(['/recursos/crear']);
  }

  editarRecurso(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/recursos/editar', id]);
  }

  eliminarRecurso(id: number | undefined): void {
    if (!id) return;
    const ok = confirm('¿Seguro que deseas eliminar este recurso?');
    if (!ok) return;

    this.loading = true;
    this.recursoService.delete(id).subscribe({
      next: () => {
        this.recursos = this.recursos.filter(r => r.id !== id);
        this.loading = false;
        alert('Recurso eliminado correctamente.');
      },
      error: (err) => {
        console.error('Error al eliminar recurso', err);
        this.error = err?.error?.detail || 'No se pudo eliminar el recurso.';
        this.loading = false;
      }
    });
  }

  trackById(_: number, item: CrearRecursoDto) {
    return item.id;
  }
}
