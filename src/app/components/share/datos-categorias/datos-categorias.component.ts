import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppService} from "../../../services/app.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-datos-categorias',
  templateUrl: './datos-categorias.component.html',
  styleUrls: ['./datos-categorias.component.css']
})
export class DatosCategoriasComponent implements OnInit {
  forma!: FormGroup;
  constructor(private formBuilder:FormBuilder, private appService:AppService, private router:Router){ }

  ngOnInit(): void {
  }

  public mostrarFormCa(buttonValue:String){
    let container=document.createElement('div');
    container.classList.add('popup-form-container');
      container.innerHTML=`<form class="popup-form" [formGroup]="forma" (ngSubmit)="guardar(forma,0)">
        <label>Nombre:</label><br/>
        <input type="text" formControlName="nombre"/><br/>
        <label>Descripción:</label><br/>
        <textarea formControlName="descripcion"></textarea><br/>
        <input type="submit" value="${buttonValue}" />
        <span (click)="borrarForm()">Cerrar</span>
      </form>`;
    document.getElementById('showForm')?.appendChild(container);
  }
  public mostrarFormSub(buttonValue:String,idCategoria:any){
    let container=document.createElement('div');
    container.classList.add('popup-form-container');
    container.innerHTML=`<form class="popup-form" [formGroup]="Form" (ngSubmit)="guardar(Form,1)>
        <label>Nombre:</label><br/>
        <input type="text"/><br/>
        <label>Descripción:</label><br/>
        <textarea></textarea><br/>
        <button>${buttonValue}</button>
        <span (click)='this.borrarForm()'>Cerrar</span>
      </form>`;
    document.getElementById('showForm')?.appendChild(container);
  }

  public borrarForm(){
    document.querySelector('.popup-form-container')?.remove();
  }

  guardar(forma: FormGroup,tipo:any){

    /*
    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control,tipo);
        control.markAsTouched();
      })
      return;
    }

     */
    if(tipo==0){
      this.anadirCategoria(forma);
    }else{
      this.anadirSubcategoria(forma);
    }

  }
  anadirCategoria(forma:any){

    let datos=forma.value
    datos.tipo='crearCategoria';
    //console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data);
          if (data['status'] != 'error') {
            console.log('data')
            this.router.navigate(['/home']);
          } else {
            //this.modal.generateModal(`Algo salió mal`, `${data['result']['error_msg']}`, 'De acuerdo', 'error');
            console.log(data)
            this.router.navigate(['/home']);
          }

        }
        , async (errorServicio) =>
        {
          console.log('he fallado')
          console.log(errorServicio);
          this.router.navigate(['/home']);


        });
  }

  anadirSubcategoria(forma:any){
    let datos=forma.value
    datos.tipo='crearSubcategoria';
    //console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data);
          if (data['status'] != 'error') {
            console.log('data')
          } else {
            //this.modal.generateModal(`Algo salió mal`, `${data['result']['error_msg']}`, 'De acuerdo', 'error');
            console.log(data)
          }

        }
        , async (errorServicio) =>
        {
          console.log('he fallado')
          console.log(errorServicio);
          //this.toast=true;


        });
  }
}
