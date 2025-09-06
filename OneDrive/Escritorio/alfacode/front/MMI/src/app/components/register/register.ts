import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../services/auth';
import { CrearUsuarioDto } from '../../../models/userI';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    InputTextModule, PasswordModule, ButtonModule, CardModule, ToastModule, RouterModule 
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  providers: [MessageService]
})
export class Register {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: User,
    private msg: MessageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.msg.add({ severity: 'warn', summary: 'Faltan datos', detail: 'Revisa el formulario.' });
      return;
    }

    this.loading = true;

    const { username, first_name, last_name, email, password } = this.form.getRawValue();

    const payload: CrearUsuarioDto = {
      username,
      first_name,
      last_name,
      email,
      password,
      promedio: null,        // <- por ahora fijo; cámbialo si lo tomas del formulario
      disponibilidad: false  // <- por ahora fijo; cámbialo si lo tomas del formulario
    };

    this.userService.register(payload).subscribe({
      next: () => {
        this.loading = false;
        this.msg.add({ severity: 'success', summary: 'Cuenta creada', detail: 'Ahora inicia sesión.' });
        this.router.navigate(['/usuarios']);
        console.log('Usuario registrado:', payload);
      },
      error: (err) => {
        this.loading = false;
        const detalle = this.humanizeErrors(err?.error) || 'No se pudo crear la cuenta.';
        this.msg.add({ severity: 'error', summary: 'Registro fallido', detail: detalle });
      }
    });
  }

  private humanizeErrors(err: any): string {
    if (!err) return '';
    if (err.detail) return err.detail;
    try {
      const parts = Object.entries(err).map(([k, v]: any) => `${k}: ${Array.isArray(v) ? v[0] : v}`);
      return parts.join(' | ');
    } catch {
      return '';
    }
  }
}
