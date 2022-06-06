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

  constructor(private router: Router) {

    this.sesion=this.getDatosSesion();
  }
  recogerUsuario(datosUsuario:UsuarioInterfaces){
    this.sesion=datosUsuario;
    console.log(this.sesion)
  }

  getDatosSesion(): UsuarioInterfaces{
    var sessionStr = this.sesion;
      return sessionStr;

  }
  comprobarAutenticacion(): boolean {
    console.log(this.getIdUsuarioActual())
    return (this.getIdUsuarioActual() != null) ? true : false;
  };

  getSesionActual(): UsuarioInterfaces{
    return this.sesion;
  }

  getIdUsuarioActual(): any {
    var session: UsuarioInterfaces = this.getDatosSesion();
    return (session && session.idUsuario) ? session.idUsuario : null;
  };

  getNombreActual(): any {
    var session: UsuarioInterfaces = this.getDatosSesion();
    console.log(session.nombre);
    return (session && session.nombre) ? session.nombre : null;
  };

  getTipoActual(): any {
    var session: UsuarioInterfaces = this.getDatosSesion();
    return (session && session.tipo) ? session.tipo : null;
  };

  setNombreActual(nombre:string){
    console.log(nombre)
    this.sesion.nombre=nombre;
    console.log(this.sesion.nombre)
  }

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

