import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Peticion } from 'src/app/home/interfaces/peticion';
import { Candidato } from '../interfaces/candidato';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  private baseUrl:string = 'https://backendvotacion.onrender.com/api';

  private _personeros:Candidato[] | undefined = [];
  private _contralores:Candidato[] | undefined= [];
  private _isLoading:boolean = false;

  private _ready:boolean = false;

  get isReady(){
    return this._ready;
  }

  get personeros(){
    return this._personeros;
  }
  get contralores(){
    return this._contralores;
  }

  get isLoading(){
    return this._isLoading;
  }
  constructor(private http: HttpClient) { }

  getCandidatos(){
    const url = `${this.baseUrl}/candidatos`;

    const headers = new HttpHeaders().set('x-token', localStorage.getItem('x-token') || '');

    return this.http.get<Peticion>(url, {headers})
            .pipe(
              tap((resp)=>{
                this._personeros = resp.candidatos?.personeros;
                this._contralores = resp.candidatos?.contralores;
                this._ready= true;
              }), map( resp => resp), catchError((err) => of(err.error.msg))
            );
  }

  getResultados(){

    const url = `${this.baseUrl}/candidatos/resultados`;

    const headers = new HttpHeaders().set('x-token', localStorage.getItem('x-token') || '');

    return this.http.get<Peticion>(url, {headers})
      .pipe(
        tap((resp)=>{



        }), map(resp => resp), catchError((err)=>of(err.error.msg))
      );

  }


  votar(idEstudiante: number, idContralor: number, idPersonero: number){

    this._isLoading = true;

    const url = `${this.baseUrl}/candidatos/votar/${idEstudiante}`;
    const body = {
      idPersonero: idPersonero,
      idContralor: idContralor
    };

    const headers = new HttpHeaders().set('x-token', localStorage.getItem('x-token') || '');

    return this.http.put<Peticion>(url, body, {
      headers
    })
    .pipe(
      tap(resp => {
        console.log(resp);
        this._isLoading = true;
      }),
      map(resp => resp), catchError((err) => of(err.error.msg))
    );
  }

  reiniciar(){
    this._isLoading = true;
    const url = `${this.baseUrl}/candidatos/reiniciarVotacion`;
    const headers = new HttpHeaders().set('x-token', localStorage.getItem('x-token') || '');

    return this.http.put<Peticion>(url, {},{headers})
              .pipe(
                tap(resp => {
                  console.log(resp);
                  this._isLoading = false;
                }), 
                map(resp => resp), catchError((err)=> of(err.error.msg))
              );
    
  }

} 
