import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"}, //Temporal
  {path: "login", component: LoginComponent},
  {path: "registro", component: RegistroComponent},
  {path: "modal", component: ModalComponent}, //Temporal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
