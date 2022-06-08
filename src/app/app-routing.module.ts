import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ModalComponent } from './components/modal/modal.component';
import { MenuComponent } from './components/share/menu/menu.component';
import {DatosCategoriasComponent} from "./components/share/datos-categorias/datos-categorias.component";
import {DatosSubcategoriasComponent} from "./components/datos-subcategorias/datos-subcategorias.component";
import {DatosUbicacionesComponent} from './components/datos-ubicaciones/datos-ubicaciones.component';
import {Autorizacion} from "./components/autorizacion/Autorizacion";

const routes: Routes = [

  {path: "login", component: LoginComponent},
  {path: "registro", component: RegistroComponent},
  {path: "home", component: MenuComponent, canActivate: [ Autorizacion ]},
  {path: "categoria", component: MenuComponent, canActivate: [ Autorizacion ]},
  {path: "perfil", component: MenuComponent, canActivate: [ Autorizacion ]},
  {path: "formularioCategorias/:id", component: DatosCategoriasComponent, canActivate: [ Autorizacion ]},
  {path: "formularioSubcategorias/:idCategoria/:idSubcategoria", component: DatosSubcategoriasComponent, canActivate: [ Autorizacion ]},
  {path: "ubicacion", component: MenuComponent, canActivate: [ Autorizacion ]},
  {path: "usuario", component: MenuComponent, canActivate: [ Autorizacion ]},
  {path: "crear-evento", component: MenuComponent, canActivate: [ Autorizacion ]},
  {path: "mis-eventos", component: MenuComponent, canActivate: [ Autorizacion ]},
  {path: "formularioUbicacion/:idUbicacion", component: DatosUbicacionesComponent, canActivate: [ Autorizacion ]},

  {path: "**", redirectTo: "/home", pathMatch: "full"},
  {path: "", redirectTo: "/home", pathMatch: "full"}//Temporal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
