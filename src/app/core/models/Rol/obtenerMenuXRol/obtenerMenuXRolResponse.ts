export interface ObtenerMenuXRolResponse {
    id: number,
    nombre: string,
    permiso: boolean,
    padre: number,
    hijos: ObtenerMenuXRolResponse[]
}