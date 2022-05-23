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
  constructor(private formBuilder: FormBuilder, private appService: AppService, private router: Router, private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe(parametros => {
      if(parametros['idSubcategoria']>0){
        this.sacarSubcategoria(parametros['idSubcategoria']);
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
      idCategoria: ['0', [Validators.minLength(1)]]

    })
  }

  //meter valores en el formulario
  cargarDatosFormulario() {
    //console.log(this.categoria.nombre)
    this.forma.reset({
      nombre: this.subcategoria.nombre,
      descripcion: this.subcategoria.descripcion,
      idCategoria: this.subcategoria.idCategoria
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


  sacarSubcategoria(idSubcategoria:any) {
    let datos = {
      tipo : 'sacarSubcategoriaId',
      idCategoria : idSubcategoria
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
