import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  modal = new ModalComponent();
  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.usuarioService.removeSesionActual();
  }


  /**
   * @ignore
   */
  ngOnInit(): void {
    this.crearFormulario();
  }
  /**
   * Añade los validadores del formulario.
   */
  crearFormulario() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
    this.ComprobarUsuario(forma);
  }

  /**
   * Valida que un campo del formulario sea correcto.
   * @param campo1 - Valor del campo
   * @returns - Campo válido y no enfocado
   */
  validar(campo1: string) {
    let campo: any = this.loginForm.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  /**
   * Hace una llamada a la API para validar que el usuario exista y los datos sean correctos.
   *
   * @param loginForm - Campos del formulario
   */
  ComprobarUsuario(loginForm: FormGroup) {
    let datos = loginForm.value;
    datos.tipo = 'login';
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.usuarioService.recogerUsuario(
            data[0]
          );
          this.router.navigate(['home']);
        } else {
          this.modal.generateModal(
            `Algo salió mal`,
            `${data['result']['error_msg']}`,
            'De acuerdo',
            'error'
          );
        }
      },
      async (errorServicio) => {
        console.log('fallo al conectar con el servidor');
        console.log(errorServicio);
      }
    );
  }

  /**
   * Permite visualizar tu contraseña.
   */
  showHide() {
    const input = <HTMLInputElement>document.getElementById('iPassword');
    const i = <HTMLInputElement>document.getElementById('ieye');
    if (input.type === 'password') {
      input.type = 'text';
      i.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
      input.type = 'password';
      i.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
  }
}
