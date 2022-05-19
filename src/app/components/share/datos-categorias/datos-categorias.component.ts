import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../../../services/app.service";
import { Router } from "@angular/router";
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-datos-categorias',
  templateUrl: './datos-categorias.component.html',
  styleUrls: ['./datos-categorias.component.css']
})
export class DatosCategoriasComponent implements OnInit {
  forma!: FormGroup;
  modal=new ModalComponent;
  categoria={
    nombre: "",
    descripcion:"",
    idCategoria: ""
  }
  constructor(private formBuilder: FormBuilder, private appService: AppService, private router: Router ) {
    this.crearFormulario();
    //this.cargarDatosFormulario();
  }

  ngOnInit(): void {
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]

    })
  }

  //comprobar formulario
  guardar(forma: FormGroup, tipo: any) {

    console.log('guardarFormulario')

    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control,tipo);
        control.markAsTouched();
      })
      return;
    }
    if (tipo == 0) {
      this.anadirCategoria(forma);
    } else {
      this.anadirSubcategoria(forma);
    }

  }

  validar(campo1: string) {
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }


  //llamar a la api para crear categoria
  anadirCategoria(forma: any) {

    let datos = forma.value
    datos.tipo = 'crearCategoria';
    //console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {
        console.log(data);
        if (data['status'] != 'error') {
          console.log('data')
          window.location.reload();
          //this.borrarForm();

        } else {
          this.modal.generateModal(`Algo salió mal`, `${data['result']['error_msg']}`, 'De acuerdo', 'error');
          console.log(data)
          //this.borrarForm();
        }

      }
        , async (errorServicio) => {
          console.log('he fallado')
          console.log(errorServicio);
          //this.borrarForm();


        });
  }
  //llamar a la api para crear subcategoria
  anadirSubcategoria(forma: any) {
    let datos = forma.value
    datos.tipo = 'crearSubcategoria';
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
        , async (errorServicio) => {
          console.log('he fallado')
          console.log(errorServicio);
          //this.toast=true;


        });
  }
  volver(){
    this.router.navigate(['categoria'])
  }

  recibirIdCategoria(idCategoria:any){
    this.sacarCategoria(idCategoria);
  }

  sacarCategoria(idCategoria:any) {
    let datos = {
    tipo : 'sacarCategoriaId',
      idCategoria : idCategoria
    }
    //console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {

          if (data['status'] != 'error') {
            this.categoria=data[0];
            this.cargarDatosFormulario()
            console.log(this.categoria);
          } else {
            //this.modal.generateModal(`Algo salió mal`, `${data['result']['error_msg']}`, 'De acuerdo', 'error');
            console.log(data)
          }

        }
        , async (errorServicio) => {
          console.log('he fallado')
          console.log(errorServicio);
          //this.toast=true;


        });

}
  cargarDatosFormulario()  {
    console.log(this.categoria)
    this.forma.reset({
      nombre: 'hola',
      descripcion: this.categoria.descripcion
    });


  }

}
