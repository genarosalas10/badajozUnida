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
    console.log(sessionStorage.getItem('nombre'));
    this.nombreUsuario = sessionStorage.getItem('nombre');
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
    if (this.usuarioService.tipo == 'u') {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Cierra la sesión
   */
  cerrarSesion() {
    sessionStorage.clear();
    window.location.reload();

  }
}
