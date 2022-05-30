import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ModalComponent } from './components/modal/modal.component';
import { MenuComponent } from './components/share/menu/menu.component';
import {DatosCategoriasComponent} from "./components/share/datos-categorias/datos-categorias.component";
import {DatosSubcategoriasComponent} from "./components/datos-subcategorias/datos-subcategorias.component";
import { DatosUbicacionesComponent } from './components/datos-ubicaciones/datos-ubicaciones.component';

const routes: Routes = [

  {path: "login", component: LoginComponent},
  {path: "registro", component: RegistroComponent},
  {path: "home", component: MenuComponent},
  {path: "categoria", component: MenuComponent},
  {path: "formularioCategorias/:id", component: DatosCategoriasComponent},
  {path: "formularioSubcategorias/:idCategoria/:idSubcategoria", component: DatosSubcategoriasComponent},
  {path: "ubicacion", component: MenuComponent},
  {path: "usuario", component: MenuComponent},
  {path: "formularioUbicacion/:idUbicacion", component: DatosUbicacionesComponent},

  {path: "**", redirectTo: "/home", pathMatch: "full"} //Temporal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
