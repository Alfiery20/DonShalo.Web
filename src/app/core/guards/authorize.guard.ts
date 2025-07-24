import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { jwtDecode } from 'jwt-decode';
import { Permisos } from '../models/Autorizacion/permiso/permisos';
import { TokenDesencriptado } from '../models/Autorizacion/permiso/tokenDesencriptado';
import { environment } from 'environments/environment';
import { MatDialog } from '@angular/material/dialog';

export const authorizeGuard: CanActivateChildFn = (childRoute, state) => {
  const localServi = inject(LocalStorageService);
  const router = inject(Router);
  const _localstoragekeys = environment.localStorageKeys;
  const dialog = inject(MatDialog);

  console.log('[GUARD] URL solicitada:', state.url)

  var token = localServi.getItem(_localstoragekeys.TOKEN);

  console.log("CHECK TOKEN GUARD", token, typeof token)

  if(typeof token !== 'string') return false;

  // var url = (state.url).split('/')[2] ?? 'intranet';
  var url = state.url.replace(/^\/+/,'').split('/')[1] || 'intranet';
  const segments = state.url.replace(/^\/+/,'').split('/')
  const basePath = segments[1]

  console.log("[GUARD] Path evaluado:",state.url.replace(/^\/+/,''), url)

  if (token) {
    try{
      const decoded = jwtDecode<TokenDesencriptado>(token);
      var permisos: Permisos[] = JSON.parse(decoded.permisos);

      if(!basePath)
        return true

      // Por ejemplo, para acceder a la propiedad "role":
      var permisoFiltrado = permisos.filter(n => n.Ruta === url)
      const permitido = permisos.some((p) => p.Ruta === basePath);

      console.log("[GUARD] esta permitido?",permitido)

      if (!permitido) {
        if(state.url !== '/intranet')
          router.navigate(['/intranet']);
        return false
      }
      return true
    }
    catch(e) {
      console.warn("[GUARD] Error en el token", e)
      dialog.closeAll()
      router.navigate(['/'])
      return false
    }
  } else {
    console.warn("[GUARD] No hay token, redirigiendo...")
    dialog.closeAll();
    if(state.url !== '/')
      router.navigate(['/']);
    return false;
  }
};
