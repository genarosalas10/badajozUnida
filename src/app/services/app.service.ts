import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private URLBASE = "https://localhost:8443/fpdual-api/";
  constructor(private router:Router, private http: HttpClient) { }

  //Para llamar a la Api con el metodo get

  getQuery(ruta:string):Observable<any>
  {
    return this.http.get(this.URLBASE+ruta)
  }


  // Metodo encargado de llamar a la api con POST y introducir el link deseado y el body de la creacion

  postQuery(ruta:string,body:any):Observable<any>
  {
    return this.http.post(this.URLBASE+ruta,body)
  }

  // Metodo encargado de llamar a la api con PUT y introducir el link deseado y el body de la creacion

  putQuery(ruta:string,body:any):Observable<any>
  {
    return this.http.put(this.URLBASE+ruta,body)
  }



  // Metodo encargado de llamar a la api con delete
  deleteQuery(ruta:string):Observable<any>
  {
    return this.http.delete(this.URLBASE+ruta)
  }

  //Metodo para la subida de archivos
  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);

    const req = new HttpRequest('POST', `${this.URLBASE}FicheroUsuario/subir`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  
}
