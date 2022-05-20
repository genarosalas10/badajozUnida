import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ModalComponent } from './components/modal/modal.component';
import { MenuComponent } from './components/share/menu/menu.component';
import {DatosCategoriasComponent} from "./components/share/datos-categorias/datos-categorias.component";

const routes: Routes = [

  {path: "login", component: LoginComponent},
  {path: "registro", component: RegistroComponent},
  {path: "home", component: MenuComponent},
  {path: "categoria", component: MenuComponent},
  {path: "formulario/:id", component: DatosCategoriasComponent},
  {path: "**", redirectTo: "/home", pathMatch: "full"} //Temporal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
