import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Estudiante } from 'src/app/home/interfaces/estudiante';
import { ServiceAuthService } from 'src/app/home/service/service-auth.service';
import { Candidato } from '../../interfaces/candidato';
import { PanelService } from '../../services/panel.service';

import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  contralores: Candidato[] = [];
  personeros: Candidato[] = [];
  estudiante!: Estudiante;
  
  FormReactive: FormGroup = this.fb.group({
    personero: ['', Validators.required],
    contralor: ['', Validators.required]
  });

  get isLoading(){
    return this.panelService.isLoading;
  }

  get isReady(){
    return this.panelService.isReady;
  }

  constructor(private panelService: PanelService, 
              private authService: ServiceAuthService,
              private fb: FormBuilder,
              private router: Router){}

  ngOnInit(){

    this.estudiante = this.authService.estudiante;

    this.panelService.getCandidatos()
          .subscribe(resp => {
            this.contralores = resp.candidatos.contralores;
            this.personeros = resp.candidatos.personeros;
          });

  }


  clickPersoneroTs(id:any){
    const tarjeta = document.getElementById(id);
    const listTarjeta = document.getElementsByClassName("personero_tarjeta");
    for (let index = 0; index < listTarjeta.length; index++) {
        listTarjeta[index].classList.remove('activo');
    }
    
    if(tarjeta != null){
      tarjeta.classList.add('activo');
    }
    this.FormReactive.get('personero')?.setValue(id);
  }

  clickContralorTs(id:any){
    const tarjeta = document.getElementById(id);
    const listTarjeta = document.getElementsByClassName("contralor_tarjeta");
    for (let index = 0; index < listTarjeta.length; index++) {
        listTarjeta[index].classList.remove('activo');
    }
    
    if(tarjeta != null){
      tarjeta.classList.add('activo');
    }
    this.FormReactive.get('contralor')?.setValue(id);
  }

  votar(){
    
    const personero = this.FormReactive.get('personero')?.value;
    const contralor = this.FormReactive.get('contralor')?.value;


    if (personero === '') {
      Swal.fire('Información', 'Debe elegir un candidato de personería', 'info');
    }else if(contralor === ''){
      Swal.fire('Información', 'Debe elegir un candidato de contraloría', 'info');
    } else {
      const resp = Swal.fire({
        title: 'Confirmar',
        icon: 'question',
        text: '¿Está seguro que desea votar por los candidatos seleccionados?',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        preConfirm: () =>{  
          return this.panelService.votar(this.estudiante.id!, contralor, personero)
            .subscribe(resp =>{
              console.log(resp);
              

              if(resp.ok){
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: `${resp.mensaje}`,
                  showConfirmButton: false,
                  timer: 1500
                });
                localStorage.removeItem('x-token');
                this.router.navigateByUrl('/invotar');
              }else{
                Swal.fire('Error', resp.mensaje, 'error');
              }
            });
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
      

    }
  }


  salir(){
    localStorage.removeItem('x-token');
    this.router.navigateByUrl('/invotar');
  }



}
