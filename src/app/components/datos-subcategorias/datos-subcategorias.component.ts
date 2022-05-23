import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-datos-subcategorias',
  templateUrl: './datos-subcategorias.component.html',
  styleUrls: ['./datos-subcategorias.component.css']
})
export class DatosSubcategoriasComponent implements OnInit {

  forma!: FormGroup;
  modal=new ModalComponent;
  subcategoria:any;
  categorias:any;
  idCategoria:any;
  constructor(private formBuilder: FormBuilder, private appService: AppService, private router: Router, private activatedRoute:ActivatedRoute) {
    this.listadoCategoria();
    this.activatedRoute.params.subscribe(parametros => {
      this.idCategoria=parametros['idCategoria'];
      console.log(parametros)
      if(parametros['idSubcategoria']>0){
        console.log('modificar')
        this.sacarSubcategoria(parametros['idSubcategoria']);
      }
    });
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  volver(){
    this.router.navigate(['categoria'])
  }

  listadoCategoria()
  {
    let datos = {
      tipo: "listadoCategoria"
    }

    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data)
          if (data['status'] != 'error') {
            this.categorias=data;
          } else {
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

  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      idCategoria: [this.idCategoria, [Validators.required]],
      idSubcategoria: ['0', [Validators.required]]

    })
  }

  //meter valores en el formulario
  cargarDatosFormulario() {
    //console.log(this.categoria.nombre)
    this.forma.reset({
      nombre: this.subcategoria.nombre,
      descripcion: this.subcategoria.descripcion,
      idSubcategoria: this.subcategoria.idSubcategoria,
      idCategoria:this.idCategoria
    });
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
    if (forma.value.idSubcategoria == 0) {
      this.anadirSubcategoria(forma);
    } else {
      this.modificarSubcategoria(forma);
    }

  }

  validar(campo1: string) {
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
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
            this.router.navigate(['/categoria']);
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


  //llamar a la api para  modificar subcategoria
  modificarSubcategoria(forma: any) {

    let datos = forma.value
    datos.tipo = 'modificarSubcategoria';
    //console.log(JSON.stringify(datos));

    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data);
          if (data['status'] != 'error') {
            console.log('data')
            this.router.navigate(['/categoria']);
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

  sacarSubcategoria(idSubcategoria:any) {
    let datos = {
      tipo : 'sacarSubcategoriaId',
      idSubcategoria : idSubcategoria
    }
    console.log(JSON.stringify(datos));
    //this.cargarDatosFormulario('Cargar1','cargar2')
    this.appService.postQuery(datos)
      .subscribe(data => {
          console.log(data)
          if (data['status'] != 'error') {
            this.subcategoria=data[0];
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
}
