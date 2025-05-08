import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { NgModule } from "@angular/core";
import { PisoComponent } from "./pages/piso/piso.component";
import { MesaComponent } from "./pages/mesa/mesa.component";
import { SucursalComponent } from "./pages/sucursal/sucursal.component";
import { PersonalComponent } from "./pages/personal/personal.component";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule { }