// src/app/services/tipo-pago.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface TipoPagoDto {           // ← así viene del backend (Django)
  tipa_id: number;
  tipa_nombre: string;
}

export interface TipoPago {              // ← modelo que usamos en el front
  id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class TipoPagoService {
  private api_uri_django = 'http://localhost:8000';
  private base_path = `${this.api_uri_django}/api/renta/`; // ajusta prefijo si aplica

  constructor(private http: HttpClient) {}

  /** Listar */
  getAll(): Observable<TipoPago[]> {
    return this.http
      .get<TipoPagoDto[]>(`${this.base_path}tipos-pago/`, { withCredentials: true })
      .pipe(map(list => (list ?? []).map(d => ({ id: d.tipa_id, nombre: d.tipa_nombre }))));
  }

  /** Obtener por id */
  getById(id: number): Observable<TipoPago> {
    return this.http
      .get<TipoPagoDto>(`${this.base_path}tipos-pago/${id}/`, { withCredentials: true })
      .pipe(map(d => ({ id: d.tipa_id, nombre: d.tipa_nombre })));
  }

  /** Crear (recibe el modelo del front) */
  create(data: { nombre: string }): Observable<TipoPago> {
    const payload: Partial<TipoPagoDto> = { tipa_nombre: data.nombre };
    return this.http
      .post<TipoPagoDto>(`${this.base_path}tipos-pago/`, payload, { withCredentials: true })
      .pipe(map(d => ({ id: d.tipa_id, nombre: d.tipa_nombre })));
  }

  /** Actualizar */
  update(id: number, data: { nombre: string }): Observable<TipoPago> {
    const payload: Partial<TipoPagoDto> = { tipa_nombre: data.nombre };
    return this.http
      .put<TipoPagoDto>(`${this.base_path}tipos-pago/${id}/`, payload, { withCredentials: true })
      .pipe(map(d => ({ id: d.tipa_id, nombre: d.tipa_nombre })));
  }

  /** Eliminar */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base_path}tipos-pago/${id}/`, { withCredentials: true });
  }
}
