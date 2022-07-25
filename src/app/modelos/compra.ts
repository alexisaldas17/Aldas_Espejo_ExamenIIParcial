import { DetalleCompra } from "./detalle-compra";

export interface Compra {
  id?: number;
  idCliente: string;
  nombre?: string;
  apellido?: string;
  direccion?: string;
  telefono?: string;
  total:number;
  fecha: Date;
  iva: number;
  subtotal: number;
  detallesFactura: DetalleCompra[];
}
