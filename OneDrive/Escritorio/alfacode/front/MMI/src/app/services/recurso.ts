// src/app/services/recurso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearRecursoDto } from '../../models/userI';

/** DTO mínimo para recursos-rol */
export interface RecursoRolDto {
  id?: number;
  rol: number;      // id de rol
  recurso: number;  // id de recurso
  asignado_en?: string; // ISODate opcional si el backend lo envía
}

@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private api_uri_django = 'http://localhost:8000';
  private base_path = `${this.api_uri_django}/api/autenticacion/`; // 🔹 Ajusta a tu endpoint real

  constructor(private http: HttpClient) {}

  // ===== Recursos ============================================================
  /** Obtener todos los recursos */
  getAll(): Observable<CrearRecursoDto[]> {
    return this.http.get<CrearRecursoDto[]>(`${this.base_path}recursos/`, { withCredentials: true });
  }

  /** Obtener un recurso por ID */
  getById(id: number): Observable<CrearRecursoDto> {
    return this.http.get<CrearRecursoDto>(`${this.base_path}recursos/${id}/`, { withCredentials: true });
  }

  /** Crear un nuevo recurso */
  create(data: CrearRecursoDto): Observable<CrearRecursoDto> {
    return this.http.post<CrearRecursoDto>(`${this.base_path}recursos/`, data, { withCredentials: true });
  }

  /** Actualizar un recurso */
  update(id: number, data: CrearRecursoDto): Observable<CrearRecursoDto> {
    return this.http.put<CrearRecursoDto>(`${this.base_path}recursos/${id}/`, data, { withCredentials: true });
  }

  /** Eliminar un recurso */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base_path}recursos/${id}/`, { withCredentials: true });
  }

  // ===== Recursos ↔ Rol (asignaciones) ======================================
  /** Crear asignación (ya lo tenías) */
  asignarRecursoArol(rolId: number, recursoId: number): Observable<any> {
    const payload: RecursoRolDto = {
      rol: Number(rolId),
      recurso: Number(recursoId)
    };
    return this.http.post(`${this.base_path}recursos-rol/`, payload, { withCredentials: true });
  }

  /** Listar todas las asignaciones recurso-rol */
  getRecursoRoles(): Observable<RecursoRolDto[]> {
    return this.http.get<RecursoRolDto[]>(`${this.base_path}recursos-rol/`, { withCredentials: true });
  }

  /** Filtrar asignaciones por rol (?rol=ID) — si tu API lo soporta */
  getRecursoRolesByRol(rolId: number): Observable<RecursoRolDto[]> {
    const params = new HttpParams().set('rol', String(rolId));
    return this.http.get<RecursoRolDto[]>(`${this.base_path}recursos-rol/`, {
      params,
      withCredentials: true
    });
  }

  /** Filtrar asignaciones por recurso (?recurso=ID) — si tu API lo soporta */
  getRecursoRolesByRecurso(recursoId: number): Observable<RecursoRolDto[]> {
    const params = new HttpParams().set('recurso', String(recursoId));
    return this.http.get<RecursoRolDto[]>(`${this.base_path}recursos-rol/`, {
      params,
      withCredentials: true
    });
  }

  /** Eliminar una asignación recurso-rol específica */
  deleteRecursoRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base_path}recursos-rol/${id}/`, { withCredentials: true });
  }

  getAsignacionesPorRol(rolId: number): Observable<RecursoRolDto[]> {
    return this.http.get<RecursoRolDto[]>(
      `${this.base_path}recursos-rol/${rolId}/`,
      { withCredentials: true }
    );
  }
}
