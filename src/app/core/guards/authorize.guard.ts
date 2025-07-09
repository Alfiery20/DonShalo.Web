import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { Permisos } from '../models/Autorizacion/permiso/permisos';
import { TokenDesencriptado } from '../models/Autorizacion/permiso/tokenDesencriptado';
import { environment } from 'environments/environment';

export const authorizeGuard: CanActivateChildFn = (childRoute, state) => {
  const localServi = inject(LocalStorageService);
  const router = inject(Router);
  const _localstoragekeys = environment.localStorageKeys;

  var token = localServi.getItem(_localstoragekeys.TOKEN);
  var url = (state.url).split('/')[2] ?? '/intranet';

  if (token) {
    const decoded = jwtDecode<TokenDesencriptado>(token);
    var permisos: Permisos[] = JSON.parse(decoded.permisos);
    // Por ejemplo, para acceder a la propiedad "role":
    var permisoFiltrado = permisos.filter(n => n.Ruta == url)
    if (permisoFiltrado.length === 0) {
      router.navigate(['/intranet']);
      return true
    }
    return true
  } else {
    router.navigate(['/']);
    return true;
  }
};
