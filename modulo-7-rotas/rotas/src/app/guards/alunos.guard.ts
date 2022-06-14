import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlunosGuard implements CanActivateChild {
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // console.log('routeee', route)
      // console.log('stateee', state)
      // console.log('guarda de rotas - alunos')

      if (state.url.includes('editar')) {
        // alert('Usuário sem acesso')
        // return of(false);
      }

      return true;
  }

}
