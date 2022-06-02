import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { CategoriaComponent } from '../../categoria/categoria.component';
import {UsuarioService} from "../../../services/usuario.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  nombreUsuario: any = ";"

  /**
   * @ignore
   */
  constructor(public router: Router,private usuarioService:UsuarioService) {

    this.nombreUsuario = usuarioService.getNombreActual();
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

  /**
   * Valida si el usuario que ha iniciado sesión es administrador o no.
   *
   * @returns - Verdadero o falso
   */
  comprobarTipo() {
    if (this.usuarioService.getTipoActual() == 'a') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Cierra la sesión
   */
  cerrarSesion() {
    this.usuarioService.cerrarSesion();

  }

  /**
   * Muestra u oculta el desplegable.
   */
  toggleOpt(){
    document.querySelector('.account-container>.desplegable')?.classList.toggle('hidden');
  }

  /**
   * Oculta el desplegable.
   */
  hideOpt(){
    document.querySelector('.account-container>.desplegable')?.classList.add('hidden');
  }
}
