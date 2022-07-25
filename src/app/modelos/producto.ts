export interface Producto {
  id: number;
  nombreProducto: string;
  precio: number;
  stock: number;
  imagen: BinaryData;
  idCategoria: number;
  nombreCategoria: string;
}
