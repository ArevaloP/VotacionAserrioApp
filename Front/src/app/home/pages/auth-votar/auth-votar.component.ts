import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ServiceAuthService } from '../../service/service-auth.service';

import Swal from 'sweetalert2';
import { Peticion } from '../../interfaces/peticion';

@Component({
  selector: 'app-auth-votar',
  templateUrl: './auth-votar.component.html',
  styleUrls: ['./auth-votar.component.css']
})
export class AuthVotarComponent {

  FormReactive: FormGroup = this.fb.group({
    documento: ['', Validators.required]
  });

  procesarPeticion: boolean = false;

  get documentoMsg(){
    const errors = this.FormReactive.get('documento')?.errors;
    if (errors){
      if(errors['required']){
        return 'El documento es obligatorio'; 
      }
    }
    return '';
  }

  get isLoadingResp(){
    return this.serviceAuth.isLoading;
  }

  constructor(private fb: FormBuilder,
              private serviceAuth: ServiceAuthService,
              private router: Router){}

  ingresar(){
    const {documento} = this.FormReactive.value;

    this.procesarPeticion = true;
    this.serviceAuth.iniciarVotar(documento)
        .subscribe( resp => {
            if(resp.ok){
              localStorage.setItem('x-token', resp.token!);
              this.router.navigateByUrl('/panel');
            }else{
              localStorage.removeItem('x-tokenEstudiante');
              Swal.fire('Alerta', resp.mensaje, 'warning');
              this.procesarPeticion = false;
            }
        } );
  }

  campoValid(campo: string){
    return (this.FormReactive.get(campo)?.invalid 
            && this.FormReactive.get(campo)?.touched);
  }  

  navegar(ruta:string){
    this.router.navigateByUrl(ruta);
  }

}
