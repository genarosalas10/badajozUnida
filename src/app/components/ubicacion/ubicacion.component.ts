import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css'],
})
export class UbicacionComponent implements OnInit {
  ubicaciones: any;
  mostrar = true;
  /**
   * @ignore
   */
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {}

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.listadoUbicacion();
  }

  /**
   * Permite filtrar ubicaciones.
   *
   * @param nombreUbicacion - Nombre de la ubicación
   */
  buscar(nombreUbicacion: any) {
    //nombreUbicacion=nombreUbicacion.trim();

    nombreUbicacion = nombreUbicacion.toLowerCase().replace(/\s/g, '');
    console.log(nombreUbicacion);
    if (nombreUbicacion == '') {
      this.listadoUbicacion();
    } else {
      this.listadoUbicacionPorNombre(nombreUbicacion);
    }
  }

  /**
   * Lista todas las ubicaciones.
   */
  listadoUbicacion() {
    let datos = {
      tipo: 'listarUbicaciones',
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        console.log(data);
        if (data['status'] != 'error') {
          this.ubicaciones = data;
        } else {
          this.mostrar = true;
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
   * Lista ubicaciones que contengan un nombre específico.
   *
   * @param nombreUbicacion - Nombre de la ubicación
   */
  listadoUbicacionPorNombre(nombreUbicacion: any) {
    let datos = {
      tipo: 'listarUbicacionesPorNombre',
      nombre: nombreUbicacion,
    };

    this.appService.postQuery(datos).subscribe(
      (data) => {
        console.log(data);
        if (data['status'] != 'error') {
          this.mostrar = true;
          this.ubicaciones = data;
        } else {
          if (data['result']['error_id'] == '200') {
            this.mostrar = false;
          }
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
   * Llama al formulario que gestiona las ubicaciones.
   *
   * @param idUbicacion - ID de la ubicación
   */
  llamarFormulario(idUbicacion: number) {
    console.log('Llamada');
    this.router.navigate(['/formularioUbicacion', idUbicacion]);
  }

  /**
   * Valida si quieres borrar una ubicación.
   *
   * @param id - ID de la ubicación
   */
  preguntaBorrado(id: any) {
    //Realizar la pregunta

    if (confirm('¿Desea borrar la ubicacion?') == true) {
      this.borrarUbicacion(id);
    }
  }

   /**
   * Borrar una ubicación específica.
   *
   * @param id - ID de la ubicación
   */
  borrarUbicacion(idUbicacion: any) {
    console.log('Borro');
    let datos = {
      tipo: 'eliminarUbicacion',
      idUbicacion: `${idUbicacion}`,
    };
    console.log(datos);
    this.appService.postQuery(datos).subscribe(
      (data) => {
        if (data['status'] != 'error') {
          console.log(data);
          this.listadoUbicacion();
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
