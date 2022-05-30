import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios:any
  modal=new ModalComponent()
  constructor(private formBuilder: FormBuilder,
              private appService: AppService,
              private router: Router) {
    this.listadoUsuario();
  }

  ngOnInit(): void {
  }

  /**
   * Lista todas los usuarios.
   */
  listadoUsuario() {
    let datos = {
      tipo: 'listado',
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        console.log(data);
        if (data['status'] != 'error') {
          this.usuarios = data;
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
   * Valida si quieres borrar un usuario.
   *
   * @param id - ID del usuario
   */
  preguntaBorrado(id: any) {
    //Realizar la pregunta

    if (confirm('¿Desea borrar el usuario?') == true) {
      this.borrarUsuario(id);
    }
  }

  /**
   * Borrar un usuario específico.
   *
   * @param id - ID del usuario
   */
  borrarUsuario(idUsuario: any) {
    console.log('Borro');
    let datos = {
      tipo: 'eliminarUsuario',
      idUsuario: `${idUsuario}`
    };
    console.log(datos);
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          console.log(data);
          this.modal.generateModal('Éxito', data, '¡De acuerdo!', 'success')
          this.listadoUsuario();
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
   * Valida si quieres cambiar el tipo de usuario.
   * 
   * @param tipo - Tipo del usuario
   */
  preguntaCambiar(idUsuario:any,tipo:string){
    if(tipo=='a'){
      if(confirm('¿Desea quitar permisos de administrador?')){
        console.log(`Usuario tipo ${tipo}`);
        this.cambiarTipo(idUsuario,tipo);
      }else{
        console.log(`Cambio no realizado`);
        
      }
    }else {
      if(confirm('¿Desea dar permisos de administrador?')){
        console.log(`Usuario tipo ${tipo}`);
        this.cambiarTipo(idUsuario,tipo);
      }else{
        console.log(`Cambio no realizado`);
        
      }
    }
   
  }
  
  /**
   * Cambia el tipo de un usuario.
   * 
   * @param idUsuario - ID del usuario
   */
  cambiarTipo(idUsuario: any, tipo:any) {
    console.log('Cmabio');
    let datos = {
      tipo: 'cambiarPermisosUsuarios',
      idUsuario: idUsuario,
      tipoUsuario: tipo  
    };
    console.log(datos);
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          console.log(data);
          this.modal.generateModal('Éxito', data, '¡De acuerdo!', 'success')
          this.listadoUsuario();
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
