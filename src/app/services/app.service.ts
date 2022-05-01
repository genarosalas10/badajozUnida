import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //private URLBASE = "http://localhost/badajozUnida/php2/controlador/controlador.php/";
  private URLBASE = "http://localhost/proyecto/badajozUnida/php/controlador/usuarios.php";
  constructor( private http: HttpClient) { }

  //Para llamar a la Api con el metodo get

  getQuery(ruta:string):Observable<any>
  {
    return this.http.get(this.URLBASE+ruta)
  }

  getQuery2(ruta:string,body:any):Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "*"
      })
    }
    return this.http.post<any>(this.URLBASE,body,httpOptions)
    //return this.http.post<any>(ruta,body,httpOptions)
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
