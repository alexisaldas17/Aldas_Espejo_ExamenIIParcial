import { Cliente } from "./cliente";


export interface Registro {
  usuario:string;
  cliente: Cliente;
  password:string;
}
