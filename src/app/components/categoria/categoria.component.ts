import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import { ModalComponent } from '../modal/modal.component';
import { DatosCategoriasComponent } from '../share/datos-categorias/datos-categorias.component';
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias:any;
  subcategorias:any;
  categoriasPopup:any;
  constructor(private formBuilder:FormBuilder, private appService:AppService, private router:Router) {
    this.listadoCategoria();
    this.listadoSubcategoria();
    this.categoriasPopup = new DatosCategoriasComponent(formBuilder, appService, router);
  }


  ngOnInit(): void {
  }
  //Crear
  llamarPoppup(idCategoria?:any){
    //console.log(idCategoria)
    if(idCategoria){
      this.categoriasPopup.mostrarFormSub('Añadir',idCategoria);
    }
    else{
      this.categoriasPopup.mostrarFormCa('Añadir');
    }

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


  listadoSubcategoria(){

    let datos = {
      tipo: "listarSubcategoria"
    }
    console.log(datos)
    this.appService.postQuery(datos)
      .subscribe(data => {

          if (data['status'] != 'error') {
            this.subcategorias=data;
            console.log(this.subcategorias)
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
  //No se utiliza de momento
  //Sacar las subcateogrias por idCategoria
  listarSub(idCategoria:any)
  {
    //idCategoria=document.getElementById('iCategorias').value;
    let datos = {
      tipo: "listarSubcategoriaId",
      idCategoria: `${idCategoria}`
  }
    console.log(datos)
    this.appService.postQuery(datos)
      .subscribe(data => {

          if (data['status'] != 'error') {
            this.subcategorias=data;
            console.log(this.subcategorias)
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

  editarSub(idSubcategoria:any){
    console.log('Editar');
  }

  borrarSub(idSubcategoria:any){
    console.log('Borrar');
  }

  borrarCat(idCategoria: any) {
    let datos = {
      tipo: "eliminarCategoria",
      idCategoria: `${idCategoria}`
    }
    console.log(datos)
    this.appService.postQuery(datos)
      .subscribe(data => {

          if (data['status'] != 'error') {
            console.log(data) ;
            window.location.reload();
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
}
