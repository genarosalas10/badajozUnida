import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  forma!: FormGroup;
  constructor(private formBuilder:FormBuilder, private appService:AppService) { }


  ngOnInit(): void {
    this.crearFormulario();
  }
  // Crear formulario
  crearFormulario() {
    this.forma = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(8)]]

    })
  }

  //Coger los datos y comprobar si son correctos
  guardar(forma: FormGroup){
    console.log(JSON.stringify(forma.value));

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
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  //LLamar a la Api para saber si el usuario existe
  ComprobarUsuario(loginForm: FormGroup)
  {
    let datos=loginForm.value
    datos.tipo='login';
    this.appService.getQuery2(`index.php`, JSON.stringify(datos.value))
      .subscribe(data =>
        {
          console.log(data);
          /*
          sessionStorage.setItem('id', id);
          sessionStorage.setItem('correo', correo);

           */
          window.location.reload();
        }
        , async (errorServicio) =>
        {
          console.log(errorServicio);
          //this.toast=true;


        });
  }
}
