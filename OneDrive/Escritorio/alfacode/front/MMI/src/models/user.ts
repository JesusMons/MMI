// src/app/models/models.ts

/** Utilidades básicas */
export type ID = number;
export type ISODateString = string;

/** En DRF los FKs suelen venir como id (number) o como objeto anidado si usas serializers nested. */
export type FK<T> = ID | T;

/** Estructura base con timestamps (como en tu TimeStampedModel). */
export interface TimeStamped {
  creado_en: ISODateString;
  actualizado_en: ISODateString;
}

/** ===== Roles ===== */
export interface Rol {
  id: ID;
  nombre: string;
  descripcion?: string | null;
}

/** ===== Recursos ===== */
export interface Recurso {
  id: ID;
  nombre: string;
  /** Ruta del backend sin dominio, ej: /api/entrenamientos/ */
  url: string;
}

/** Relación Rol-Recurso */
export interface RecursoRol {
  id: ID;
  rol: FK<Rol>;
  recurso: FK<Recurso>;
  asignado_en: ISODateString;
}

/** ===== Usuario (AbstractUser + extras) =====
 *  Campos típicos de AbstractUser + tus campos: promedio, disponibilidad, timestamps.
 */
export interface Usuario extends TimeStamped {
  id: ID;
  username: string;
  first_name: string;
  last_name: string;
  email: string;

  promedio?: number | null;
  disponibilidad: boolean;

  // Campos estándar de auth (inclúyelos si tu serializer los expone)
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  last_login?: ISODateString | null;
  date_joined?: ISODateString;

  // Si tu serializer devuelve roles asignados anidados, puedes representarlos así:
  roles_asignados?: UsuarioRol[];
}

/** Unión Usuario–Rol */
export interface UsuarioRol {
  id: ID;
  usuario: FK<Usuario>;
  rol: FK<Rol>;
  asignado_en: ISODateString;
}

/** ===== JWT / Auth ===== */
export interface JwtTokens {
  access: string;
  refresh: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

/** Ajusta los campos a lo que acepte tu RegisterSerializer */
export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

/** ===== DTOs de creación/edición ===== */
export interface CrearUsuarioDto {
  username: string;
  email: string;
  password?: string;         // opcional si lo creas sin password desde admin
  first_name?: string;
  last_name?: string;
  promedio?: number | null;
  disponibilidad?: boolean;
}

export interface ActualizarUsuarioDto extends Partial<CrearUsuarioDto> {}

export interface CrearRolDto {
  nombre: string;
  descripcion?: string | null;
}

export interface CrearRecursoDto {
  nombre: string;
  url: string;
}

export interface CrearUsuarioRolDto {
  usuario: ID;
  rol: ID;
}

export interface CrearRecursoRolDto {
  rol: ID;
  recurso: ID;
}

/** ===== Paginación DRF ===== */
export interface ApiList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
