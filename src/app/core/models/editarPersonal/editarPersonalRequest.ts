export interface EditarPersonalRequest {
    id: number,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    telefono: string,
    correo: string,
    idRol: number,
    idSucursal: number
}