import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder:FormBuilder, private appService:AppService, private router:Router) { }
  modal=new ModalComponent;

  ngOnInit(): void {
    this.crearFormulario();
  }
  // Crear formulario
  crearFormulario() {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]

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
    this.ComprobarUsuario(forma);
    //this.forma.reset();

  }

  //Validador
  validar(campo1: string){
    let campo: any = this.loginForm.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  //LLamar a la Api para saber si el usuario existe
  ComprobarUsuario(loginForm: FormGroup)
  {
    let datos=loginForm.value
    datos.tipo='login';
    //console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data);
          if (data['status'] != 'error') {
            sessionStorage.setItem('idUsuario', data[0]['idUsuario']);
            sessionStorage.setItem('nombre', data[0]['nombre']);
            sessionStorage.setItem('tipo', data[0]['tipo']);
            this.router.navigate(['home']);
          } else {
            this.modal.generateModal(`Algo salió mal`, `${data['result']['error_msg']}`, 'De acuerdo', 'error');
          }
          /*
           window.location.reload();
           */
        }
        , async (errorServicio) =>
        {
          console.log('he fallado')
          console.log(errorServicio);
          //this.toast=true;


        });

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
}
