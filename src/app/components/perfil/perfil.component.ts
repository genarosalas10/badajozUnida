import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {UsuarioService} from "../../services/usuario.service";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario:any;
  forma!: FormGroup;
  modal = new ModalComponent();
  /**
   * @ignore
   */
  constructor(private formBuilder: FormBuilder,
              private appService: AppService,
              private usuarioService: UsuarioService) {
    this.crearFormulario();
    this.sacarUsuario(usuarioService.getIdUsuarioActual());
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
  }

  /**
   * Inizializa los validadores del formulario.
   */
  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([a-zA-ZÀ-ÿ\u00f1\u00d1]{4,30})(\s{0,1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,29}){0,1}$/
          ),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([a-zA-ZÀ-ÿ\u00f1\u00d1]){4,30})(\s{0,1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{2,29}){0,1}$/
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
          ),
        ],
      ]
    });
  }

  /**
   * Comprueba que todos los campos introducidos sean correctos.
   *
   * @param forma - Campos del formulario
   * @returns - void
   */
  guardar(forma: FormGroup) {
    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach((control) => {
        if (control instanceof FormGroup) this.guardar(control);
        control.markAsTouched();
      });

      return;
    }
    this.modificarUsuario(forma);
  }
  /**
   * Añade la información del usuario al formulario
   */
  cargarDatosFormulario() {
    this.forma.reset({
      nombre: this.usuario.nombre,
     apellidos: this.usuario.apellidos,
      email: this.usuario.email,
    });
  }

  /**
   * Obtiene los datos de un usuario.
   * @param idUsuario - ID del usuario
   */
  sacarUsuario(idUsuario: any) {
    let datos = {
      tipo: 'perfilUsuario',
      idUsuario: idUsuario,
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.usuario = data[0];
          this.usuarioService.setNombreActual(data[0]['nombre']);
          this.cargarDatosFormulario();
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
   * Llama a la API para modificar a un usuario.
   * @param forma - Campos del formulario
   */
  modificarUsuario(forma: FormGroup) {
    let datos = forma.value;
    datos.tipo = 'modificarPerfilUsuario';
    datos.idUsuario = this.usuarioService.getIdUsuarioActual();
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.modal.generateModal(
            'Éxito',
            `${data}`,
            'De acuerdo',
            'success'
          );
        } else {
          this.modal.generateModal(
            'Algo salió mal',
            `${data['result']['error_msg']}`,
            'De acuerdo',
            'error'
          );
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }

  /**
   * Valida que un campo del formulario sea correcto.
   * @param campo1 - Valor del campo
   * @returns - Campo válido y no enfocado
   */
  validar(campo1: string) {
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }
}
