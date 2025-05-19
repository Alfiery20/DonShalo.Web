export interface VerSucursalResponse {
    id: number,
    codigoSucursal: string,
    nombre: string,
    direccion: string,
    telefono: string,
    horaEntrada: string,
    horaSalida: string,
    estado: boolean,
    idResponsable: number,
    responsable: string
}