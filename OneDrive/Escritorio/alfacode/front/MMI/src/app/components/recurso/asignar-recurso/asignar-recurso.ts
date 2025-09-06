// Standalone - Angular 20
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG standalone (no dropdown)
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

import { RolService, Rol } from '../../../services/rol';
import { RecursoService } from '../../../services/recurso';

// Normalizamos el recurso al formato que usa el formulario
type Recurso = { id: number; nombre: string; url: string };

@Component({
  selector: 'app-asignar-recurso',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Card, Button],
  templateUrl: './asignar-recurso.html',
  styleUrls: ['./asignar-recurso.css']
})
export class AsignarRecurso implements OnInit {
  loading = false;
  error = '';
  okMsg = '';

  roles: Rol[] = [];
  recursos: Recurso[] = [];

  private fb = inject(NonNullableFormBuilder);
  private rolSvc = inject(RolService);
  private recursoSvc = inject(RecursoService);

  // Ambos campos requeridos
 form = this.fb.group({
    rolId: <number | null>(null),
    recursoId: <number | null>(null),
  });


  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.loading = true;
    this.error = '';
    this.okMsg = '';

    // Cargamos roles y recursos en paralelo
    // (sin forkJoin para evitar imports extra; dos subs simples)
    this.rolSvc.getAllRoles().subscribe({
      next: (roles) => { this.roles = roles ?? []; },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los roles.';
      }
    });

    this.recursoSvc.getAll().subscribe({
      next: (recursosDto) => {
        // Normaliza a {id:number, nombre, url}
        this.recursos = (recursosDto ?? []).map(r => ({
          id: Number(r.id ?? 0),
          nombre: r.nombre,
          url: r.url
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los recursos.';
        this.loading = false;
      }
    });
  }

  asignar(): void {
    this.error = '';
    this.okMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Selecciona un rol y un recurso.';
      return;
    }

    const rolId = Number(this.form.value.rolId);
    const recursoId = Number(this.form.value.recursoId);
    if (!rolId || !recursoId) {
      this.error = 'IDs inválidos.';
      return;
    }

    this.loading = true;

    // El servicio ya envía {rol, recurso} como espera el backend
    this.recursoSvc.asignarRecursoArol(rolId, recursoId).subscribe({
      next: () => {
        this.loading = false;
        this.okMsg = 'Recurso asignado al rol correctamente.';
      },
      error: (err) => {
        this.loading = false;
        const nonField = err?.error?.non_field_errors as string[] | undefined;
        if (Array.isArray(nonField) && nonField.some(m => m.toLowerCase().includes('unique'))) {
          this.error = 'Ese recurso ya está asignado a ese rol.';
        } else {
          this.error =
            err?.error?.detail ||
            (typeof err?.error === 'object' ? JSON.stringify(err.error) : err?.message) ||
            'No se pudo asignar el recurso.';
        }
        console.error('Detalle backend:', err?.error);
      }
    });
  }

  resetForm(): void {
    this.form.reset({ rolId: null, recursoId: null });
    this.okMsg = '';
    this.error = '';
  }
}
