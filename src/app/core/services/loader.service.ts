import { Injectable } from '@angular/core';
import { LoaderComponentVars } from '../../shared/components/loader/loader.component.vars';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private loader: LoaderComponentVars) { }

  MostrarLoader() {
    this.loader.showLoader = true;
  }

  OcultarLoader() {
    this.loader.showLoader = false;
  }
}
