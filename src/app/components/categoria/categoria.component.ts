import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppService} from "../../services/app.service";
import {Router} from "@angular/router";
import { ModalComponent } from '../modal/modal.component';
import { DatosCategoriasComponent } from '../share/datos-categorias/datos-categorias.component';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias:any;
  subcategorias:any;
  categoriasPopup:any;
  modal=new ModalComponent;
  constructor(private formBuilder:FormBuilder, private appService:AppService, private router:Router) {
    this.listadoCategoria();
    this.listadoSubcategoria();
  }


  ngOnInit(): void {
  }

  //Ir a modificar o crear Categoria
  llamarFormularioCategoria(idCategoria:any){
      console.log('hola')
    this.router.navigate(['/formularioCategorias',idCategoria]);
  }

  //Ir a modificar o crear Subcategoria
  llamarFormularioSubcategoria(idCategoria:any,idSubcategoria:any){
    console.log('hola')
    this.router.navigate(['/formularioSubcategorias',idCategoria,idSubcategoria]);
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

  //Borrar Categoria
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


        });
  }
  //Borrar Subcategoria

  borrarSub(idSubcategoria: any) {
    console.log(idSubcategoria)
    let datos = {
      tipo: "eliminarSubcategoria",
      idSubcategoria: `${idSubcategoria}`
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
        });
  }
}
