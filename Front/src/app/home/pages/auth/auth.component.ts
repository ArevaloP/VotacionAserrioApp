import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceAuthService } from '../../service/service-auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  public procesarPeticion:boolean = false;

  FormReactive: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  get usernameMsg(){
    const errors = this.FormReactive.get('username')?.errors;
    if (errors){
      if(errors['required']){
        return 'El nombre de usuario es obligatorio'; 
      }
    }
    return '';
  }

  get passwordMsg(){
    const errors = this.FormReactive.get('password')?.errors;
    if (errors){
      if(errors['required']){
        return 'La contraseña es obligatoria'; 
      }
    }
    return '';
  }

  get isLoadingAuth(){
    return this.authService.isLoading;
  }

  constructor(private fb: FormBuilder, 
              private authService: ServiceAuthService,
              private router: Router){

  }

  login(){

    const username = this.FormReactive.get('username')?.value;
    const password = this.FormReactive.get('password')?.value;

    this.procesarPeticion = true;
    this.authService.loginAdmin(username, password)
      .subscribe( resp => {
        if(resp.ok){
          localStorage.setItem('x-token', resp.token!);
          this.router.navigateByUrl('/panel/administrar');
        }else{
          this.procesarPeticion = false;
          localStorage.removeItem('x-token');
          Swal.fire('Alerta', resp.mensaje, 'warning');
        }
      });
  }

  campoValid(campo: string){
    return (this.FormReactive.get(campo)?.invalid 
            && this.FormReactive.get(campo)?.touched);
  }

  navegar(ruta:string){
    this.router.navigateByUrl(ruta);
  }

}
