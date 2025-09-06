import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';

// PrimeNG (standalone en Angular 20)
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { EstadoService } from '../../../../services/renta/estados';

@Component({
  selector: 'app-crear-estado',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Card, InputText, ButtonModule],
  templateUrl: './crear-estado.html',
  styleUrls: ['./crear-estado.css']
})
export class CrearEstado {
  private fb = inject(NonNullableFormBuilder);
  private estadoSvc = inject(EstadoService);
  private router = inject(Router);

  loading = false;
  error = '';

  form = this.fb.group({
    esta_nombre: ['', [Validators.required, Validators.maxLength(45)]],
  });

  get f() { return this.form.controls; }

  save(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;

    const payload = this.form.getRawValue(); // { esta_nombre: string }
    this.estadoSvc.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/estados']); // vuelve al listado
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al crear estado:', err);
        this.error =
          err?.error?.detail ||
          err?.message ||
          'No se pudo crear el estado. Revisa los datos o tus permisos.';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/estados']);
  }
}
