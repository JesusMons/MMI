// src/app/models/renta.models.ts
// Modelos del FRONT basados en los modelos Django compartidos.

// Reutilizamos tus tipos base
import { ID, ISODateString, FK, ApiList, Usuario } from '../models/userI';

/* ========================================================================
 * Entidades mínimas referenciadas desde renta (inventario/autenticación)
 * Si ya tienes estos modelos en otros archivos, puedes borrar estas "Ref"
 * y usar tus interfaces reales.
 * ====================================================================== */
export interface ProductoRef { id: ID; nombre?: string; }
export interface TipoCategoriaRef { id: ID; nombre?: string; }
export interface MarcaRef { id: ID; nombre?: string; }
export interface PrestamoRef { id: ID; nombre?: string; }

/* ========================================================================
 * Renta
 * Django: class Renta(models.Model)
 * ====================================================================== */
export interface Renta {
  rent_id: ID;
  renta_fecha_prestamo: ISODateString;   // 'YYYY-MM-DD'
  renta_fecha_devolucion?: ISODateString | null; // 'YYYY-MM-DD' o null
  usuario: FK<Usuario>;                  // id o objeto Usuario
}

/** DTOs */
export interface CrearRentaDto {
  renta_fecha_prestamo: ISODateString;
  renta_fecha_devolucion?: ISODateString | null;
  usuario: ID; // FK por id
}

export interface ActualizarRentaDto extends Partial<CrearRentaDto> {}

/* ========================================================================
 * TipoPago
 * Django: class TipoPago(models.Model)
 * ====================================================================== */
// src/app/services/tipo-pago.service.ts
export interface TipoPagoDto {
  tipa_id: number;     // 👈 así viene del backend
  tipa_nombre: string;
}


/** DTOs */
export interface CrearTipoPagoDto {
  tipa_nombre: string;
}

export interface ActualizarTipoPagoDto extends Partial<CrearTipoPagoDto> {}

/* ========================================================================
 * Estado
 * Django: class Estado(models.Model)
 * ====================================================================== */
export interface Estado {
  esta_id: ID;
  esta_nombre: string;
}

/** DTOs */
export interface CrearEstadoDto {
  esta_nombre: string;
}

export interface ActualizarEstadoDto extends Partial<CrearEstadoDto> {}

/* ========================================================================
 * Pago
 * Django: class Pago(models.Model)
 * - Decimales como number | string para tolerar formateos del backend
 * - Fechas tipo 'YYYY-MM-DD' (usar ISODateString)
 * ====================================================================== */
export interface Pago {
  pago_id: ID;

  pago_total: number | string;
  pago_descuento?: number | string | null;
  pago_total_cancelado?: number | string | null;

  pago_fecha_facturacion?: ISODateString | null;
  pago_fecha_limite_pago?: ISODateString | null;

  tipo_pago: FK<TipoPagoDto>; // id o objeto
  estado: FK<Estado>;      // id o objeto
  renta: FK<Renta>;        // id o objeto (Rentas_rent_id)
}

/** DTOs */
export interface CrearPagoDto {
  pago_total: number | string;
  pago_descuento?: number | string | null;
  pago_total_cancelado?: number | string | null;

  pago_fecha_facturacion?: ISODateString | null;
  pago_fecha_limite_pago?: ISODateString | null;

  tipo_pago: ID; // FK por id
  estado: ID;    // FK por id
  renta: ID;     // FK por id (Rentas_rent_id)
}

export interface ActualizarPagoDto extends Partial<CrearPagoDto> {}

/* ========================================================================
 * RentaProducto (relación N:M)
 * Django: class RentaProducto(models.Model)
 * unique_together = ("renta", "producto")
 * ====================================================================== */
export interface RentaProducto {
  // El modelo en Django no define pk explícita; DRF suele exponer una `id`.
  id?: ID; // opcional por si DRF la agrega

  renta: FK<Renta>;                      // FK (Rentas_rent_id)
  producto: FK<ProductoRef>;             // FK (productos_prod_id)
  tipo_categoria: FK<TipoCategoriaRef>;  // FK (productos_tipo_categoria_tipr_id)
  marca: FK<MarcaRef>;                   // FK (productos_marca_marca_id)
  prestamo: FK<PrestamoRef>;             // FK (productos_prestamo_pres_ID)
}

/** DTOs */
export interface CrearRentaProductoDto {
  renta: ID;
  producto: ID;
  tipo_categoria: ID;
  marca: ID;
  prestamo: ID;
}

export interface ActualizarRentaProductoDto extends Partial<CrearRentaProductoDto> {}

/* ========================================================================
 * Listas paginadas (si tu API usa DRF paginación)
 * Ejemplos de alias útiles para servicios/rutas
 * ====================================================================== */
export type ListaRentas = ApiList<Renta>;
export type ListaPagos = ApiList<Pago>;
export type ListaEstados = ApiList<Estado>;
export type ListaTiposPago = ApiList<TipoPagoDto>;
export type ListaRentaProductos = ApiList<RentaProducto>;
