import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-mis-eventos',
  templateUrl: './mis-eventos.component.html',
  styleUrls: ['./mis-eventos.component.css']
})
export class MisEventosComponent implements OnInit {

  eventosParticipo:any;
  eventosCreados:any;
  mostrarCreados=true;
  mostrarParticipo=true;
  mostrarC=false;
  mostrarP=false;
  idUsuario:any;
  constructor( private usuarioService: UsuarioService, private formBuilder: FormBuilder,
               private appService: AppService,
               private router: Router) {
    this.listadoEventoByUsuario(usuarioService.getIdUsuarioActual());
    this.listadoEventoByCreador(usuarioService.getIdUsuarioActual());
    this.idUsuario=usuarioService.getIdUsuarioActual();
  }

  ngOnInit(): void {
  }

  /**
   * Lista todas los eventos que participa un usuario.
   */
  listadoEventoByUsuario(idUsuario:any) {
    let datos = {
      tipo: 'listarEventosbyParticipante',
      idParticipante: idUsuario
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        console.log(data);
        if (data['status'] != 'error') {
          this.eventosParticipo = this.decodificarImagen(data);
          this.mostrarP=true;
        } else {
          if (data['result']['error_id'] == '200') {
            this.mostrarP=false;
          }
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }


  /**
   * Lista todos los eventos creados por un usuario.
   */
  listadoEventoByCreador(idUsuario:any) {
    let datos = {
      tipo: 'listarEventosbyCreador',
      idCreador: idUsuario
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        console.log(data);
        if (data['status'] != 'error') {

          this.eventosCreados = this.decodificarImagen(data);
          this.mostrarC=true;
        } else {
          console.log(data);
          if (data['result']['error_id'] == '200') {
            this.mostrarC=false;
          }
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }

  decodificarImagen(datos:any){
    for (let i=0;i<datos.length;i++){
      datos[i]['imagen']=atob(datos[i]['imagen']);
    }
    return datos;
  }

  mostrar(valor:any) {
    console.log('cambio')
    if(valor==1){
      if(this.mostrarCreados){
        this.mostrarCreados=false;
      }else{
        this.mostrarCreados=true;
      }
    }
    if(valor==2){
      if(this.mostrarParticipo){
        this.mostrarParticipo=false;
      }else{
        this.mostrarParticipo=true;
      }
    }
  }
  /**
   * Valida si quieres borrar un evento o desapuntarte de un evento.
   *
   * @param id - ID del evento
   */
  preguntaBorrado(id: any,valor:any) {
    //Realizar la pregunta
    if(valor==1){
      if (confirm('¿Desea borrar el evento?') == true) {
        this.borrarEvento(id);
      }
    }else{
      if (confirm('¿Desea desapuntarte del evento?') == true) {
        this.borrarParticipante(id);
      }
    }
  }

  /**
   * Borrar a un participante de un evento.
   *
   * @param id - ID del Evento
   */
  borrarParticipante(idEvento: any) {
    console.log('idEvento');
    let datos = {
      tipo: 'eliminarParticipante',
      idEvento: `${idEvento}`,
      idUsuario: `${this.idUsuario}`

    };
    console.log(datos);
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          console.log(data);
          this.listadoEventoByUsuario(this.idUsuario);
          this.listadoEventoByCreador(this.idUsuario);
        } else {
          console.log(data);
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }

  /**
   * Borrar a un participante de un evento.
   *
   * @param id - ID del Evento
   */
  borrarEvento(idEvento: any) {
    console.log('idEvento');
    let datos = {
      tipo: 'eliminarEvento',
      idEvento: `${idEvento}`,
      idUsuario: `${this.idUsuario}`

    };
    console.log(datos);
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          console.log(data);
          this.listadoEventoByUsuario(this.idUsuario);
          this.listadoEventoByCreador(this.idUsuario);
        } else {
          console.log(data);
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }
}
