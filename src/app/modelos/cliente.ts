export class Cliente {
  cedula: string;
  nombre: string;
  apellido: string;
   direccion: string;
   telefono: string;
   correo: string;

   // eslint-disable-next-line @typescript-eslint/member-ordering
   constructor(cedula: string, nombre:string, apellido:string, direccion:string,
    telefono:string, correo:string) {
      this.cedula = cedula;
      this.nombre = nombre;
      this.apellido = apellido;
      this.direccion = direccion;
      this.telefono = telefono;
      this.correo = correo;
   }


}
