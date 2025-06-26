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
        children: [
            {
                path: "",
                component: DefaultComponent,
                canActivate: [authorizeGuard]
            },
            {
                path: "personal",
                component: PersonalComponent,
                canActivate: [authorizeGuard]
            },
            {
                path: "sucursal",
                component: SucursalComponent,
                canActivate: [authorizeGuard]
            },
            {
                path: "piso",
                component: PisoComponent,
                canActivate: [authorizeGuard]
            },
            {
                path: "mesa",
                component: MesaComponent,
                canActivate: [authorizeGuard]
            },
            {
                path: "rol",
                component: RolComponent,
                canActivate: [authorizeGuard]
            },
            {
                path: "medioPago",
                component: MediopagoComponent,
                canActivate: [authorizeGuard]
            },
            {
                path: "atencionMesa",
                component: GestionMesaComponent,
                canActivate: [authorizeGuard]
            },
            {
                path: "categoria",
                component: CategoriaComponent,
                canActivate: [authorizeGuard]
            },
            {
                path: "plato",
                component: PlatoComponent,
                canActivate: [authorizeGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule { }