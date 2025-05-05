export interface ObtenerMenuRequest {
    id: number,
    nombre: string,
    ruta: string,
    idMenuPadre: number,
    orden: number,
    menuHijo: ObtenerMenuRequest[]
}