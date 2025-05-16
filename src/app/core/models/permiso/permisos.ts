export interface Permisos {
    Id: number,
    Nombre: string,
    Ruta: string,
    IdMenuPadre: number,
    Orden: number,
    MenuHijo: Permisos[]
}