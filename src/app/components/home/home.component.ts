import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsuarioService} from "../../services/usuario.service";
import {FormBuilder} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventos:any;
  modal=new ModalComponent();
  eventosByUsuario: any;
  mostrar=true
  /**
   * @ignore
  */
  constructor(private usuarioService: UsuarioService, private formBuilder: FormBuilder,
              private appService: AppService,
              private router: Router) {
    this.listadoEvento();
    this.usuarioService.comprobarAutenticacion();
    this.listadoEventoByUsuario(usuarioService.getIdUsuarioActual());
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }


  /**
   * Lista todas los eventos.
   */
  listadoEvento() {
    let datos = {
      tipo: 'listarEventos',
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.eventos = data;
          this.mostrar=true;
        } else {
          this.mostrar=false;
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }


  /**
   * Añadir participante a un evento.
   *
   * @param idEvento - ID de evento
   */
  anadirParticipante(idEvento: any) {
    let datos = {
      tipo: 'anadirParticipante',
      idEvento: `${idEvento}`,
      idUsuario: this.usuarioService.getIdUsuarioActual()
    };
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.modal.generateModal('Éxito', data, '¡De acuerdo!', 'success')
          this.listadoEvento();
          this.listadoEventoByUsuario(this.usuarioService.getIdUsuarioActual());
        } else {
          this.modal.generateModal(`Algo salió mal`, `${data['result']['error_msg']}`, 'De acuerdo', 'error');
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }




  /**
   * Lista todas los eventos.
   */
  listadoEventoByUsuario(idUsuario:any) {
    let datos = {
      tipo: 'listarEventosbyParticipanteSoloId',
      idUsuario: idUsuario
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.eventosByUsuario = data;
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
   * Comprueba si el usuario está apuntado al evento.
   * @param idEvento - ID el evento
   * @returns true o false
   */
  comprobarParticipante(idEvento:any) {
    if (this.eventosByUsuario) {
      for (let i = 0; i < this.eventosByUsuario.length; i++) {
        if (this.eventosByUsuario[i]['idEvento'] == idEvento) {
          return false
        }
      }
      return true;
    }
    return true;
  }
}
