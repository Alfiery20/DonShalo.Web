import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./pages/login/login.component";
import { authorizeGuard } from "../core/guards/authorize.guard";

const routes: Routes = [
    {
        path: "",
        component: LoginComponent,
        children: [

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PublicRoutingModule { }