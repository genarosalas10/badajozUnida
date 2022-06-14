import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  forma!: FormGroup;
  modal = new ModalComponent();
  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}

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
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,20}$/
          ),
        ],
      ],
      password2: ['', [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
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
    this.registro(forma);
  }

  /**
   * Llama a la API para dar de alta a un usuario.
   * @param loginForm - Campos del formulario
   */
  registro(loginForm: FormGroup) {
    let datos = loginForm.value;
    datos.tipo = 'registro';
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.modal.generateModal(
            'Éxito',
            `Cuenta creada con éxito.`,
            'De acuerdo',
            'success'
          );
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
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
        //this.toast=true;
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

  /**
   * Verifica que ambas contraseñas coincidan.
   */
  get comprobarPasswords() {
    let pass1 = this.forma.get('password')?.value;
    let pass2 = this.forma.get('password2')?.value;
    return pass1 === pass2 ? true : false;
  }

  /**
   * Comprueba que el usuario sea mayor de 16 años.
   */
  get comprobarEdad() {
    if (this.forma.get('fechaNacimiento') != null) {
      let fechaNacimiento = this.forma.get('fechaNacimiento')?.value;
      let convertirFecha = new Date(fechaNacimiento).getTime();
      let timeDiff = Math.abs(Date.now() - convertirFecha);
      let edad = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
      return edad >= 16 ? true : false;
    }
    return true;
  }

  /**
   * Permite visualizar tu contraseña
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
  /**
   * @ignore
   */
  showHide2() {
    const input = <HTMLInputElement>document.getElementById('iPasswordRepeat');
    const i = <HTMLInputElement>document.getElementById('ieye2');
    if (input.type === 'password') {
      input.type = 'text';
      i.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    } else {
      input.type = 'password';
      i.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    }
  }
}
