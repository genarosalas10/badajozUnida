import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { DatosCategoriasComponent } from '../share/datos-categorias/datos-categorias.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  categorias: any;
  subcategorias: any;
  categoriasPopup: any;
  mostrar = true;
  modal = new ModalComponent();
  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.listadoCategoria();
    this.listadoSubcategoria();
  }

  /**
   * @ignore
   */
  ngOnInit(): void {}

  /**
   * Llama al formulario que gestiona las categorías
   *
   * @param idCategoria - ID de la categoría
   */
  llamarFormularioCategoria(idCategoria: any) {
    console.log('hola');
    this.router.navigate(['/formularioCategorias', idCategoria]);
  }

  /**
   * Llama al formulario que gestiona las subcategorías
   *
   * @param idCategoria - ID de la categoría
   * @param idSubcategoria - ID de la subcategoría
   */
  llamarFormularioSubcategoria(idCategoria: any, idSubcategoria: any) {
    console.log('hola');
    this.router.navigate([
      '/formularioSubcategorias',
      idCategoria,
      idSubcategoria,
    ]);
  }

  /**
   * Muestra en pantalla las categorías
   */
  listadoCategoria() {
    let datos = {
      tipo: 'listadoCategoria',
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.categorias = data;
          this.mostrar = true;
        } else {
          this.mostrar = false;
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }

  /**
   * Muestra en pantalla las subcategorías
   */
  listadoSubcategoria() {
    let datos = {
      tipo: 'listarSubcategoria',
    };
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.subcategorias = data;
        } else {
          console.log(data);
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }
  //No se utiliza de momento
  /**
   * @ignore
   */
  listarSub(idCategoria: any) {
    //idCategoria=document.getElementById('iCategorias').value;
    let datos = {
      tipo: 'listarSubcategoriaId',
      idCategoria: `${idCategoria}`,
    };
    console.log(datos);
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.subcategorias = data;
        } else {
          console.log(data);
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
        //this.toast=true;
      }
    );
  }

  /**
   * Realiza una pregunta antes de efectuar un borrado.
   *
   * @param id - ID de la categoría/subcategoría
   * @param tipo - Categoría o Subcategoría
   */
  preguntaBorrado(id: any, tipo: any) {
    //Realizar la pregunta
    if (tipo == 'c') {
      if (confirm('¿Desea borrar la categoría?') == true) {
        this.borrarCat(id);
      }
    } else {
      if (confirm('¿Desea borrar la subcategoría?') == true) {
        this.borrarSub(id);
      }
    }
  }

  /**
   * Borra una categoría.
   *
   * @param id - ID de la categoría
   */
  borrarCat(idCategoria: any) {
    let datos = {
      tipo: 'eliminarCategoria',
      idCategoria: `${idCategoria}`,
    };
    console.log(datos);
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.modal.generateModal('Éxito', data, '¡De acuerdo!', 'success')
          this.listadoCategoria();
        } else {
          this.modal.generateModal(`Algo salió mal`, `${data['result']['error_msg']}`, 'De acuerdo', 'error');
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }

  /**
   * Borra una subcategoría.
   *
   * @param id - ID de la subcategoría
   */
  borrarSub(idSubcategoria: any) {
    console.log(idSubcategoria);
    let datos = {
      tipo: 'eliminarSubcategoria',
      idSubcategoria: `${idSubcategoria}`,
    };
    console.log(datos);
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.modal.generateModal('Éxito', data, '¡De acuerdo!', 'success')
          this.listadoSubcategoria();
        } else {
          this.modal.generateModal(`Algo salió mal`, `${data['result']['error_msg']}`, 'De acuerdo', 'error');
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }
}
