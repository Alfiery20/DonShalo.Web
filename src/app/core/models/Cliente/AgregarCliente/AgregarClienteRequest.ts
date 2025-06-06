export interface AgregarClienteRequest {
    tipoDocumento: string,
    numeroDocumento: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    ruc: string,
    razonSocial: string,
    direccion: string,
    direccionEntrega: string
}