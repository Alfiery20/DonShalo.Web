export interface ObtenerMenuRequest {
    id: number,
    nombre: string,
    icon: string,
    ruta: string,
    idMenuPadre: number,
    orden: number,
    menuHijo: ObtenerMenuRequest[]
}