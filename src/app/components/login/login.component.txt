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
    let datos=loginForm.value
    datos.tipo='login';
    console.log(JSON.stringify(datos));
    this.appService.getQuery2('http://localhost/badajozUnida/php2/controlador/index.php', JSON.stringify(datos))
        .subscribe(response=>{
            console.table(response);
            if(response['status']!='error'){
                alert('Hola'+' ' + response[0]['nombre'])
            }else{
                alert(response['result']['error_id']+" " + response['result']['error_msg'])
            }
        })
  }

  validar(campo1: string){
    let campo: any = this.loginForm.get(campo1);
    return !(campo.invalid && campo.touched);
  }

}
