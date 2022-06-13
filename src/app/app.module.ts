import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './components/modal/modal.component';
import { MenuComponent } from './components/share/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DatosCategoriasComponent } from './components/share/datos-categorias/datos-categorias.component';
import { DatosSubcategoriasComponent } from './components/datos-subcategorias/datos-subcategorias.component';
import { DatosUbicacionesComponent } from './components/datos-ubicaciones/datos-ubicaciones.component';
import {Autorizacion} from "./components/autorizacion/Autorizacion";
import { CrearEventoComponent } from './components/crear-evento/crear-evento.component';
import { MisEventosComponent } from './components/mis-eventos/mis-eventos.component';
import {AlifeFileToBase64Module} from "alife-file-to-base64";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    ModalComponent,
    MenuComponent,
    HomeComponent,
    CategoriaComponent,
    UbicacionComponent,
    UsuariosComponent,
    PerfilComponent,
    DatosCategoriasComponent,
    DatosSubcategoriasComponent,
    DatosUbicacionesComponent,
    CrearEventoComponent,
    MisEventosComponent,

  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        IonicModule.forRoot(),
        AlifeFileToBase64Module,
    ],
  providers: [Autorizacion],
  bootstrap: [AppComponent]
})
export class AppModule { }
