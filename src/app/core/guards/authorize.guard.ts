import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { Permisos } from '../models/permiso/permisos';
import { TokenDesencriptado } from '../models/permiso/tokenDesencriptado';

export const authorizeGuard: CanActivateChildFn = (childRoute, state) => {
  const localServi = inject(LocalStorageService);
  const router = inject(Router);

  var token = localServi.getItem('token');
  var url = (state.url).split('/')[2];

  if (token) {
    const decoded = jwtDecode<TokenDesencriptado>(token);
    var permisos: Permisos[] = JSON.parse(decoded.permisos);
    // Por ejemplo, para acceder a la propiedad "role":
    var permisoFiltrado = permisos.filter(n => n.Ruta == url)
    console.log(permisos);
    console.log(url);
    console.log(permisoFiltrado);
    if (permisoFiltrado.length === 0) {
      console.log(1);
      router.navigate(['/intranet']);
      return true
    }
    console.log(2);
    return true
  } else {
    console.log(3);
    router.navigate(['/']);
    return true;
  }
};
