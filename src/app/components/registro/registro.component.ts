import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {ModalComponent} from "../modal/modal.component";

//504921600000 ms
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  forma!: FormGroup;
  modal=new ModalComponent;
  constructor(private formBuilder:FormBuilder, private appService:AppService) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  // Crear formulario
  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      apellidos:['',[Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      email:['',[Validators.required, Validators.email, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i) ]],
      password:['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,20}$/)]],
      password2:['',[Validators.required ]],
      fechaNacimiento:[null,[Validators.required ]]

    })
  }
  //Coger los datos y comprobar si son correctos
  guardar(forma: FormGroup){

    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control);
        control.markAsTouched();
      })

      return;
    }
    this.registro(forma);
    //this.forma.reset();

  }

//LLamar a la Api para crear usuario
  registro(loginForm: FormGroup)
  {
    let datos=loginForm.value
    datos.tipo='registro';
    console.log(JSON.stringify(datos));
    this.appService.postQuery(datos)
      .subscribe(data => {
          if (data['status'] != 'error') {
            this.modal.generateModal('Éxito', `Cuenta creada con éxito.`, 'De acuerdo', 'success');
          } else {
            this.modal.generateModal('Algo salió mal', `${data['result']['error_msg']}`, 'De acuerdo', 'error');
          }

        }
        , async (errorServicio) =>
        {
          console.log('he fallado')
          console.log(errorServicio);
          //this.toast=true;


        });
  }

  //Validador
  validar(campo1: string){
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  //Comprobar si las contraseñas son iguales
  get comprobarPasswords() {
    let pass1 = this.forma.get('password')?.value;
    let pass2 = this.forma.get('password2')?.value;
    return (pass1 === pass2) ? true : false;
  }

  //Comprobar si tiene mas de 14 años
  get comprobarEdad()
  {
    if(this.forma.get('fechaNacimiento')!= null){
    let fechaNacimiento = this.forma.get('fechaNacimiento')?.value;
    let convertirFecha = new Date(fechaNacimiento).getTime();
    let timeDiff = Math.abs(Date.now() - convertirFecha);
    let edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    return (edad >= 16) ? true : false;
    }
    return true;
  }

  //Ver contraseña
  showHide() {

    const input = <HTMLInputElement>document.getElementById('iPassword');
    const i = <HTMLInputElement>document.getElementById("ieye");
    if (input.type === "password") {
      input.type = "text";
      i.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
    } else {
      input.type = "password";
      i.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
    }
  }
  //Ver contraseña repetida
  showHide2() {

    const input = <HTMLInputElement>document.getElementById('iPasswordRepeat');
    const i = <HTMLInputElement>document.getElementById("ieye2");
    if (input.type === "password") {
      input.type = "text";
      i.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
    } else {
      input.type = "password";
      i.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
    }
  }
}
