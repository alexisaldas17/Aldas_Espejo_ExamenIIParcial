export class Errores {

  private static readonly error400: string = "Error 400: El servidor no pudo interpretar la solicitud.";
  private static readonly error401: string = "Error 401: No está autorizado para ver la información.";
  private static readonly error403: string = "Error 403: No está autorizado para ver la información.";
  private static readonly error404: string = "Error 404: No se encontró el recurso solicitado.";
  private static readonly error500: string = "Error 500: Error interno del servidor.";
  private static readonly error501: string = "Error 501: El servidor no soporta la función solicitada.";
  private static readonly error502: string = "Error 502: El servidor no pudo completar la solicitud.";
  private static readonly error503: string = "Error 503: El servidor no está disponible.";
  private static readonly error504: string = "Error 504: La conexión con el servidor ha expirado.";

  public static mostrar = (codigo: number) => {
    switch (codigo) {
      case 400:
        return this.error400;
      case 401:
        return this.error401;
      case 403:
        return this.error403;
      case 404:
        return this.error404;
      case 500:
        return this.error500;
      case 501:
        return this.error501;
      case 502:
        return this.error502;
      case 503:
        return this.error503;
      case 504:
        return this.error504;
      default:
        return "Error desconocido. Intentelo mas tarde";
    }
  };
}
