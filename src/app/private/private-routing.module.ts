import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { NgModule } from "@angular/core";
import { PisoComponent } from "./pages/piso/piso.component";
import { MesaComponent } from "./pages/mesa/mesa.component";
import { SucursalComponent } from "./pages/sucursal/sucursal.component";
import { PersonalComponent } from "./pages/personal/personal.component";
import { RolComponent } from "./pages/rol/rol.component";
import { authorizeGuard } from "../core/guards/authorize.guard";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule { }