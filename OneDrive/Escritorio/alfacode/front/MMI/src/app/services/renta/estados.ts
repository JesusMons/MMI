// src/app/services/estado.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

/** DRF a veces responde {results: []}; esto lo normaliza a T[] */
interface ApiList<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
}

/** Tal como lo expone tu backend */
export interface EstadoDto {
  esta_id: number;
  esta_nombre: string;
}

/** Forma “plana” para el UI */
export interface Estado {
  id: number;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class EstadoService {
  private api_uri_django = 'http://localhost:8000';
  // Ajusta el prefijo si tu API difiere (p.ej. '/api/renta/')
  private base_path = `${this.api_uri_django}/api/renta/estados/`;

  constructor(private http: HttpClient) {}

  /** helper: {results:T[]} | T[] -> T[] */
  private normalizeList<T>() {
    return map((res: ApiList<T> | T[]) => (Array.isArray(res) ? res : (res.results ?? [])));
  }

  // ===== CRUD =====

  /** Listar “raw” (como viene del backend) */
  listRaw(): Observable<EstadoDto[]> {
    return this.http
      .get<ApiList<EstadoDto> | EstadoDto[]>(this.base_path, { withCredentials: true })
      .pipe(this.normalizeList<EstadoDto>());
  }

  /** Listar mapeado a {id, nombre} (ideal para selects) */
  list(): Observable<Estado[]> {
    return this.listRaw().pipe(
      map(items => items.map(i => ({ id: i.esta_id, nombre: i.esta_nombre })))
    );
  }

  get(id: number): Observable<EstadoDto> {
    return this.http.get<EstadoDto>(`${this.base_path}${id}/`, { withCredentials: true });
  }

  create(payload: { esta_nombre: string }): Observable<EstadoDto> {
    return this.http.post<EstadoDto>(this.base_path, payload, { withCredentials: true });
  }

  update(id: number, payload: { esta_nombre: string }): Observable<EstadoDto> {
    return this.http.put<EstadoDto>(`${this.base_path}${id}/`, payload, { withCredentials: true });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base_path}${id}/`, { withCredentials: true });
  }
}
