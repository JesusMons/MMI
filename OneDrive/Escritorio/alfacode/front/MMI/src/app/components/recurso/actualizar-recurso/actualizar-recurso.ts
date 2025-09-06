import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, Validators, NonNullableFormBuilder } from '@angular/forms';

// PrimeNG standalone
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Button, ButtonModule } from 'primeng/button';

import { RecursoService } from '../../../services/recurso';

@Component({
  selector: 'app-actualizar-recurso',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, Card, InputText, ButtonModule],
  templateUrl: './actualizar-recurso.html',
  styleUrls: ['./actualizar-recurso.css']
})
export class ActualizarRecurso implements OnInit {
  loading = false;
  error = '';
  recursoId!: number;

  private fb = inject(NonNullableFormBuilder);
  private recursoService = inject(RecursoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(150)]],
    url: ['', [Validators.required, Validators.maxLength(255)]],
  });

  get f() { return this.form.controls; }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.recursoId = Number(idParam);
    if (!this.recursoId) {
      this.error = 'ID inválido.';
      return;
    }
    this.cargar(this.recursoId);
  }

  private cargar(id: number): void {
    this.loading = true;
    this.error = '';
    this.recursoService.getById(id).subscribe({
      next: (r) => {
        this.form.reset({
          nombre: r?.nombre ?? '',
          url: r?.url ?? '',
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar recurso:', err);
        this.error = err?.error?.detail || 'No se pudo cargar el recurso.';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const payload = this.form.getRawValue();

    this.recursoService.update(this.recursoId, payload).subscribe({
      next: () => {
        this.loading = false;
        alert('Recurso actualizado correctamente.');
        this.router.navigate(['/recursos']);
      },
      error: (err) => {
        console.error('Error al actualizar recurso:', err);
        this.error =
          err?.error?.detail ||
          err?.message ||
          'No se pudo actualizar el recurso.';
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/recursos']);
  }
}
