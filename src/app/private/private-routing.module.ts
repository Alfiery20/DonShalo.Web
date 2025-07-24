import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { NgModule } from "@angular/core";
import { PisoComponent } from "./pages/piso/piso.component";
import { MesaComponent } from "./pages/mesa/mesa.component";
import { SucursalComponent } from "./pages/sucursal/sucursal.component";
import { PersonalComponent } from "./pages/personal/personal.component";
import { RolComponent } from "./pages/rol/rol.component";
import { authorizeGuard } from "../core/guards/authorize.guard";
import { MediopagoComponent } from "./pages/mediopago/mediopago.component";
import { GestionMesaComponent } from "./pages/gestion-mesa/gestion-mesa.component";
import { CategoriaComponent } from "./pages/categoria/categoria.component";
import { PlatoComponent } from "./pages/plato/plato.component";
import { DefaultComponent } from "./pages/default/default.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        canActivateChild: [authorizeGuard],
        children: [
            {
                path: "",
                component: DefaultComponent,
            },
            {
                path: "personal",
                component: PersonalComponent
            },
            {
                path: "sucursal",
                component: SucursalComponent
            },
            {
                path: "piso",
                component: PisoComponent
            },
            {
                path: "mesa",
                component: MesaComponent
            },
            {
                path: "rol",
                component: RolComponent
            },
            {
                path: "medioPago",
                component: MediopagoComponent
            },
            {
                path: "atencionMesa",
                component: GestionMesaComponent
            },
            {
                path: "categoria",
                component: CategoriaComponent
            },
            {
                path: "plato",
                component: PlatoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule { }