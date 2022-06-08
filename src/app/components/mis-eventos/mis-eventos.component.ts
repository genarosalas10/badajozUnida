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

  constructor( private usuarioService: UsuarioService, private formBuilder: FormBuilder,
               private appService: AppService,
               private router: Router) {
    this.listadoEventoByUsuario(usuarioService.getIdUsuarioActual());
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
        } else {
          //this.mostrar = true;
          console.log(data);
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

}
