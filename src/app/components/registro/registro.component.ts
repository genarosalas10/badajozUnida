import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";

//504921600000 ms
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  forma!: FormGroup;
  constructor(private formBuilder:FormBuilder, private appService:AppService) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  // Crear formulario
  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      apellidos:['',[Validators.required, Validators.minLength(8), Validators.maxLength(60)]],
      email:['',[Validators.required, Validators.email, Validators.pattern(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i) ]],
      password:['',[Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,20}$/)]],
      password2:['',[]],
      fechaNacimiento:['',[Validators.required ]]

    })
  }
  //Coger los datos y comprobar si son correctos
  guardar(forma: FormGroup){

    this.comprobarPasswords();
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
  }
  //Validador
  validar(campo1: string){
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }
  //Comprobar si las contraseñas son iguales
  comprobarPasswords() {
    let pass1 = this.forma.get('password')?.value;
    let pass2 = this.forma.get('password.2')?.value;
    console.log(pass1)
    console.log(pass2)
    return (pass1 === pass2) ? true : false;
  }
}
