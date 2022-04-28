import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    constructor(private formBuilder:FormBuilder, private appService:AppService) { }

    ngOnInit(): void {
            this.loginForm = this.formBuilder.group({
            email:['',[Validators.required, Validators.email]],
            password:['',[Validators.required, Validators.minLength(8)]]
        })
    }

  enviar(loginForm: FormGroup){
    console.log(JSON.stringify(loginForm.value));
    this.appService.getQuery2('http://localhost/badajozUnida/php2/controlador/controlador.php', JSON.stringify(loginForm.value))
        .subscribe(response=>{
            if(response['respuesta']=='OK'){
                alert('Éxito')
            }else{
                alert('Fracaso')
            }
        })
  }

  validar(campo1: string){
    let campo: any = this.loginForm.get(campo1);
    return !(campo.invalid && campo.touched);
  }

}
