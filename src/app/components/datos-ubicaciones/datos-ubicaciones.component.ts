import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-datos-ubicaciones',
  templateUrl: './datos-ubicaciones.component.html',
  styleUrls: ['./datos-ubicaciones.component.css']
})
export class DatosUbicacionesComponent implements OnInit {

  forma!: FormGroup;
  modal=new ModalComponent;
  idUbicacion:any;
  ubicacion:any;
  constructor(private formBuilder: FormBuilder, private appService: AppService, private router: Router, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(parametros => {
      this.idUbicacion=parametros['idUbicacion'];
      console.log(parametros)
      if(parametros['idUbicacion']>0){
        console.log('modificar')
        this.sacarUbicacion(parametros['idUbicacion']);
      }
    });

  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      idUbicacion: ['0', [Validators.minLength(1)]]

    })
  }

  //comprobar formulario
  guardar(forma: FormGroup) {

    console.log('guardarFormulario')

    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach(control => {
        if (control instanceof FormGroup)
          this.guardar(control);
        control.markAsTouched();
      })
      return;
    }
    console.log(forma.value)
    if (forma.value.idUbicacion == 0) {
      this.anadirUbicacion(forma);
    } else {
      this.modificarUbicacion(forma);
    }

  }

  validar(campo1: string) {
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }


  //llamar a la api para crear categoria
  anadirUbicacion(forma: any) {

    let datos = forma.value
    datos.tipo = 'crearUbicacion';
    //console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {
        console.log(data);
        if (data['status'] != 'error') {
          console.log('data')
          this.router.navigate(['/ubicacion']);
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

  //llamar a la api para  modificar categoria
  modificarUbicacion(forma: any) {

    let datos = forma.value
    datos.tipo = 'modificarUbicacion';
    //console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data);
          if (data['status'] != 'error') {
            console.log('data')
            this.router.navigate(['/ubicacion']);
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

  volver(){
    this.router.navigate(['ubicacion'])
  }


  sacarUbicacion(idUbicacion:any) {
    let datos = {
    tipo : 'sacarUbicacionId',
      idUbicacion : idUbicacion
    }
    console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data)
          if (data['status'] != 'error') {
            this.ubicacion=data[0];
            this.cargarDatosFormulario()
            //console.log(this.categoria);
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
    //console.log(this.categoria.nombre)
    this.forma.reset({
      nombre:this.ubicacion.nombre,
      descripcion: this.ubicacion.descripcion,
      idUbicacion: this.idUbicacion
    });


  }


}
