import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciarSesionRequest } from '../../../core/models/Autenticacion/iniciarSesion/iniciarSesionRequest';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AutenticacionService } from '../../../core/services/autenticacion.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../../../core/services/loader.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formulario: FormGroup;
  showPassword: boolean = false;

  private _localStorageKeys = environment.localStorageKeys;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private localService: LocalStorageService,
    private autentitacionService: AutenticacionService,
    private loaderServi: LoaderService
  ) {
    this.formulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }


  ValidarInicioSesion() {
    if (this.ValidarFormulario()) {
      this.formulario.markAllAsTouched();
    } else {
      this.IniciarSesion();
    }
  }

  showErrorModal(text:string)
  {
    Swal.fire({
      title: text,
      icon: "error",
    });
  }

  ValidarFormulario() {
    switch(true)
    {
      case this.formulario.controls['correo'].hasError('required'):
        this.showErrorModal('No se ha proporcionado un correo');
        return false;
      case this.formulario.controls['correo'].hasError('email'):
        this.showErrorModal('El correo proporcionado es inválido');
        return false;
      case this.formulario.controls['clave'].hasError('required'):
        this.showErrorModal('No se ha proporcionado una contraseña');
        return false;
    }
    return true;
  }

  onSubmit()
  {
    if(this.formulario.invalid) return;
    this.IniciarSesion();
  }

  IniciarSesion() {
    var userLogin: IniciarSesionRequest = {
      correo: this.formulario.value.correo,
      clave: this.formulario.value.clave,
    };
    this.loaderServi.MostrarLoader();
    this.autentitacionService.IniciarSesion(userLogin)
    .subscribe({
      next: (response) => {
        if (response != null && response.token != null) {
          this.localService.setItem(this._localStorageKeys.TOKEN, response.token);
          this.localService.setItem(this._localStorageKeys.USER, JSON.stringify(response));
          this.loaderServi.OcultarLoader();
          Swal.fire({
            title: "Bienvenido!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000
          });
          this.router.navigate(['intranet']);
        } else {
          this.loaderServi.OcultarLoader();
          Swal.fire({
            title: "Correo o Contraseña incorrectas",
            icon: "error",
          });
        }
      },
      error: (error) => {
        console.log('erro',error)
        this.loaderServi.OcultarLoader();
        Swal.fire({
          title: "Hubo un error en el servidor",
          icon: "error",
        });
      }
  });

  }

}
