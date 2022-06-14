import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private URLBASE2 = "https://2daw.esvirgua.com/01/php/controlador/index.php"; //Servidor
  constructor( private http: HttpClient) { }

  //Para llamar a la Api con el metodo get

  getQuery(ruta:string):Observable<any>
  {
    return this.http.get(this.URLBASE2+ruta)
  }

  getQuery2(body:any):Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post<any>(this.URLBASE2,body,httpOptions)
    //return this.http.post<any>(ruta,body,httpOptions)
  }

  // Metodo encargado de llamar a la api con POST y introducir el link deseado y el body de la creacion

  postQuery(body:any):Observable<any>
  {
    body = JSON.stringify(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(this.URLBASE2,body,httpOptions)
  }

  // Metodo encargado de llamar a la api con PUT y introducir el link deseado y el body de la creacion

  putQuery(body:any):Observable<any>
  {
    body = JSON.stringify(body);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.put(this.URLBASE2,body, httpOptions)
  }



  // Metodo encargado de llamar a la api con delete
  deleteQuery(ruta:string):Observable<any>
  {

    return this.http.delete(this.URLBASE2+ruta)
  }

  //Metodo para la subida de archivos
  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);

    const req = new HttpRequest('POST', `${this.URLBASE2}FicheroUsuario/subir`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

}
