import { Injectable } from '@angular/core';
import {UsuarioInterfaces} from "../components/interfaces/UsuarioInterfaces";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  sesion:UsuarioInterfaces={
    idUsuario: null,
    nombre:null,
    tipo:null
  };
  /**
   * @ignore
   */
  constructor(private router: Router) {

    this.sesion=this.getDatosSesion();
  }

  /**
   * Recoge los datos del usuario al iniciar sesión
   * @param datosUsuario
   */
  recogerUsuario(datosUsuario:UsuarioInterfaces){
    this.sesion=datosUsuario;
  }

  /**
   * Para coger los datos de la sesión
   */
  getDatosSesion(): UsuarioInterfaces{
    var sessionStr = this.sesion;
      return sessionStr;

  }

  /**
   * Comprueba si existe los datos de la sesión
   */
  comprobarAutenticacion(): boolean {
    return (this.getIdUsuarioActual() != null) ? true : false;
  };

  /**
   * Para coger los datos de la sesion actual
   */
  getSesionActual(): UsuarioInterfaces{
    return this.sesion;
  }

  /**
   * Para coger el id del usuario
   */
  getIdUsuarioActual(): any {
    var session: UsuarioInterfaces = this.getDatosSesion();
    return (session && session.idUsuario) ? session.idUsuario : null;
  };

  /**
   * Para coger el nombre del usuario
   */
  getNombreActual(): any {
    var session: UsuarioInterfaces = this.getDatosSesion();
    return (session && session.nombre) ? session.nombre : null;
  };

  /**
   * Para coger el tipo de usuario
   */
  getTipoActual(): any {
    var session: UsuarioInterfaces = this.getDatosSesion();
    return (session && session.tipo) ? session.tipo : null;
  };

  /**
   * Para cambiar el nombre del usuario
   * @param nombre
   */
  setNombreActual(nombre:string){
    this.sesion.nombre=nombre;
  }

  /**
   * Para eliminar la sesión
   */
  removeSesionActual(): void {
    this.sesion.tipo = null;
    this.sesion.idUsuario = null;
    this.sesion.nombre = null;

  }

  cerrarSesion(): void{
    this.removeSesionActual();
    this.router.navigate(['/login']);
  }
}

