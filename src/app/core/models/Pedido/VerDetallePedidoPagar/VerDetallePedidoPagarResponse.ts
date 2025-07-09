import { VerDetallePedidoParaPagarDetalle } from "./VerDetallePedidoParaPagarDetalleResponse";

export interface VerDetallePedidoPagarResponse {
    id: number;
    nroSerie: string;
    nroCorrelativo: string;
    clienteNatural: string;
    clienteJuridico: string;
    idPersonal: number;
    personal: string;
    idMesa: number;
    mesa: string;
    detalles: VerDetallePedidoParaPagarDetalle[]
}