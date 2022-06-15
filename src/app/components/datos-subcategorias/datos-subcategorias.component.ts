import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-datos-subcategorias',
  templateUrl: './datos-subcategorias.component.html',
  styleUrls: ['./datos-subcategorias.component.css'],
})
export class DatosSubcategoriasComponent implements OnInit {
  forma!: FormGroup;
  modal = new ModalComponent();
  subcategoria: any;
  categorias: any;
  idCategoria: any;

  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.listadoCategoria();
    this.activatedRoute.params.subscribe((parametros) => {
      this.idCategoria = parametros['idCategoria'];
      if (parametros['idSubcategoria'] > 0) {
        this.sacarSubcategoria(parametros['idSubcategoria']);
      }
    });
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.crearFormulario();
  }

  /**
   * @ignore
   */
  volver() {
    this.router.navigate(['categoria']);
  }

  /**
   * Lista todas las categorías.
   */
  listadoCategoria() {
    let datos = {
      tipo: 'listadoCategoria',
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.categorias = data;
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

  /**
   * Inizializa los validadores del formulario.
   */
  crearFormulario() {
    this.forma = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      idCategoria: [this.idCategoria, [Validators.required]],
      idSubcategoria: ['0', [Validators.required]],
    });
  }

  /**
   * En caso de edición, añade los valores anteriores de los campos al formulario.
   */
  cargarDatosFormulario() {
    //console.log(this.categoria.nombre)
    this.forma.reset({
      nombre: this.subcategoria.nombre,
      descripcion: this.subcategoria.descripcion,
      idSubcategoria: this.subcategoria.idSubcategoria,
      idCategoria: this.idCategoria,
    });
  }

  /**
   * Comprueba los campos del formulario.
   * @param forma - Campos del formulario
   * @returns - void
   */
  guardar(forma: FormGroup) {
    if (forma.invalid || forma.pending) {
      Object.values(forma.controls).forEach((control) => {
        if (control instanceof FormGroup) this.guardar(control);
        control.markAsTouched();
      });
      return;
    }
    console.log(forma.value);
    if (forma.value.idSubcategoria == 0) {
      this.anadirSubcategoria(forma);
    } else {
      this.modificarSubcategoria(forma);
    }
  }

  /**
   * Valida un campo del formulario.
   * @param campo1 - Campo del formulario
   * @returns - Campo válido y no enfocado
   */
  validar(campo1: string) {
    let campo: any = this.forma.get(campo1);
    return !(campo.invalid && campo.touched);
  }

  /**
   * Añade una nueva subcategoría.
   * @param forma - Datos de la subcategoría
   */
  anadirSubcategoria(forma: any) {
    let datos = forma.value;
    datos.tipo = 'crearSubcategoria';


    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.router.navigate(['/categoria']);
        } else {
          this.modal.generateModal(`Algo salió mal`, `${data['result']['error_msg']}`, 'De acuerdo', 'error');
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
   * Modifica una subcategoría.
   * @param forma - Datos de la subcategoría
   */
  modificarSubcategoria(forma: any) {
    let datos = forma.value;
    datos.tipo = 'modificarSubcategoria';

    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          console.log('data');
          this.router.navigate(['/categoria']);
        } else {
          this.modal.generateModal(
            `Algo salió mal`,
            `${data['result']['error_msg']}`,
            'De acuerdo',
            'error'
          );
          console.log(data);
        }
      },
      async (errorServicio) => {
        console.log('he fallado');
        console.log(errorServicio);
      }
    );
  }

  /**
   * Obtiene los datos de una subcategoría.
   * @param idSubcategoria - ID de la subcategoría
   */
  sacarSubcategoria(idSubcategoria: any) {
    let datos = {
      tipo: 'sacarSubcategoriaId',
      idSubcategoria: idSubcategoria,
    };
    console.log(JSON.stringify(datos));
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          this.subcategoria = data[0];
          this.cargarDatosFormulario();
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
}
