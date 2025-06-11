export interface ObtenerPedidoResponse {
    idPedido: number;
    serie: string;
    correlativo: string;
    clienteId: number;
    numeroDocumento: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    ruc: string;
    razonSocial: string;
    estado: string;
}