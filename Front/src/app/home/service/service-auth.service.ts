import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, map, retry } from "rxjs/operators";
import { of, Observable } from "rxjs";

import { Estudiante } from '../interfaces/estudiante';
import { Peticion } from '../interfaces/peticion';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {

  private baseUrl: string = 'https://backendvotacion.onrender.com/api';
  private _estudiante!: Estudiante;
  private _isLoading: boolean = false;

  get isLoading(){
    return this._isLoading;
  }

  get estudiante(){
    return {...this._estudiante};
  }

  constructor(private http: HttpClient) { }
  
  iniciarVotar(documento: string){
    this._isLoading = true;
    const url= `${this.baseUrl}/estudiantes/${documento}`;
    return this.http.get<Peticion>(url)
    .pipe(
      tap(resp =>{
        console.log(resp);
        this._isLoading = false;
      }), map(resp =>resp), catchError(err => of(err.error.msg))
    );
  }

  loginAdmin(username: string, password: string){
    this._isLoading = true;
    const url = `${this.baseUrl}/usuarios/auth`;

    const body = {
      username,
      password
    };
    
    return this.http.post<Peticion>(url, body)
        .pipe(
          tap(resp => {
            console.log(resp);
            this._isLoading = false;
          }), map(resp => resp), catchError(err => of(err.error.mesg))
        );

  }

  validarJWT(): Observable<boolean>{

    const url = `${this.baseUrl}/estudiantes/renew/jwt`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('x-token') || '');

    return this.http.get<Peticion>(url, {headers})
    .pipe(
      map(resp =>{
        localStorage.setItem('x-token', resp.token!);
        this._estudiante = {
          id: resp.estudiante?.id,
          nombre: resp.estudiante?.nombre,
          apellido: resp.estudiante?.apellido,
          grado: resp.estudiante?.grado,
          voto: resp.estudiante?.voto
        }
        return resp.ok;
      }),
      catchError(err => of(false))
    );
  }
  
}
