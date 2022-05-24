import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  idUsuario!:number;
  tipo!:string;
  constructor() { }
  recogerUsuario(idUsuario:number,tipo:string){
    this.idUsuario=idUsuario;
    this.tipo=tipo;
    console.log(this.tipo)
  }
}

