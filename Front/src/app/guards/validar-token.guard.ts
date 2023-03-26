import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceAuthService } from '../home/service/service-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private serviceAuth: ServiceAuthService,
              private router: Router){}

  canActivate(): Observable<boolean> | boolean {
    
    return this.serviceAuth.validarJWT()
      .pipe(
        tap( valid => {
          if(!valid){
            this.router.navigateByUrl('/invotar');
          }
        })
      );
  }

  canLoad(): Observable<boolean>| boolean {
    
    return this.serviceAuth.validarJWT()
      .pipe(
        tap( valid => {
          if(!valid){
            this.router.navigateByUrl('/invotar');
          }
        })
      );

  }
}
