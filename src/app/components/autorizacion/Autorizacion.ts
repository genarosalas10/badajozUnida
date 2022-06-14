import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {UsuarioService} from "../../services/usuario.service";

@Injectable()
export class Autorizacion implements CanActivate {

  /**
   * @ignore
   */
  constructor(private router: Router,
              private usuarioService: UsuarioService) { }

  /**
   * Comprobar si esta autenticado
   */
  canActivate() {
    if (this.usuarioService.comprobarAutenticacion()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
