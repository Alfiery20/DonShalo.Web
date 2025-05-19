export interface AgregarPersonalRequest {
    tipoDocumento: string,
    numeroDocumento: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    telefono: string,
    correo: string,
    clave: string,
    idRol: number,
    idSucursal: number,
}