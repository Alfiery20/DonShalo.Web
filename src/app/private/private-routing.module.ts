import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./pages/layout/layout.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PrivateRoutingModule { }