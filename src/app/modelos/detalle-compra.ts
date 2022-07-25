export interface DetalleCompra {
  idFacturaCabecera?:number;
  idFacturaDetalle?: number;
  idProducto:number;
  nombreProducto?: string;
  cantidad:number;
  precio?:number;
  subtotal:number;
  nombreCategoria?:string;
}
