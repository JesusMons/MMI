// src/app/components/recurso/crear-recurso/crear-recurso.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { RecursoService } from '../../../services/recurso';

@Component({
  selector: 'app-crear-recurso',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Card, InputText, Button],
  templateUrl: './crear-recurso.html',
  styleUrls: ['./crear-recurso.css'],
})
export class CrearRecurso {
  loading = false;
  error = '';

  private fb = inject(NonNullableFormBuilder);
  private recursoService = inject(RecursoService);
  private router = inject(Router);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    url: ['', [Validators.required, Validators.maxLength(255)]],
  });

  get f() {
    return this.form.controls;
  }

  save(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = this.form.getRawValue();

    this.recursoService.create(payload).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/recursos']);
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al crear recurso:', err);
        this.error =
          err?.error?.detail ||
          err?.message ||
          'No se pudo crear el recurso. Revisa los datos o permisos.';
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/recursos']);
  }
}
