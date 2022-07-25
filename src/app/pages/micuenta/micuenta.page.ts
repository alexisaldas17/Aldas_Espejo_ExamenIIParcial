import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Errores } from 'src/app/Entidades/MensajeError';
import { Cliente } from 'src/app/modelos/cliente';
import { AuthService } from 'src/app/servicios/auth.service';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-micuenta',
  templateUrl: './micuenta.page.html',
  styleUrls: ['./micuenta.page.scss'],
})
export class MicuentaPage implements OnInit {
  cliente: Cliente;
  formCliente: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public toastController: ToastController,
    private loadingController: LoadingController,
  ) {
    this.cliente = {
      nombre: '',
      apellido: '',
      cedula: '',
      direccion: '',
      telefono: '',
      correo: '',
    };
  }

  ngOnInit() {
    this.cargarCliente();
    this.inicializarFormCliente();
  }

  inicializarFormCliente() {

    if (this.cliente != null) {
      this.formCliente = this.formBuilder.group({
        nombre: [this.cliente.nombre, [Validators.required, Validators.min(1)]],
        apellido: [
          this.cliente.apellido,
          [Validators.required, Validators.min(1)],
        ],
        direccion: [
          this.cliente.direccion,
          [Validators.required, Validators.min(1)],
        ],
        cedula: [
          this.cliente.cedula,
          [Validators.required, Validators.min(10)],
        ],
        telefono: [
          this.cliente.telefono,
          [Validators.required, Validators.min(10)],
        ],
        correo: [this.cliente.correo, [Validators.required, Validators.email]],
      });
    } else {
      this.formCliente = this.formBuilder.group({
        nombre: ['', [Validators.required, Validators.min(1)]],
        apellido: ['', [Validators.required, Validators.min(1)]],
        direccion: ['', [Validators.required, Validators.min(1)]],
        cedula: ['', [Validators.required, Validators.min(10)]],
        telefono: ['', [Validators.required, Validators.min(10)]],
        correo: ['', [Validators.required, Validators.email]],
      });
    }
  }

  async cargarCliente() {
    const cedula = localStorage.getItem('id');
    this.clienteService.getClienteDatos(cedula).subscribe(
      async (res: any) => {
         this.cliente = {
          nombre: res.Nombre,
          apellido: res.Apellido,
          cedula: res.Cedula,
          direccion: res.Direccion,
          telefono: res.Telefono,
          correo: res.Correo,
        };
      },
      (error: HttpErrorResponse) => {
        // eslint-disable-next-line eqeqeq
        if (error.status == 401) {
          this.authService.logoutAviso();
        } else {
          alert(Errores.mostrar(error.status));
        }
      }
    );

  }

  async guardarDatos() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.clienteService.updateClienteDatos(this.formCliente.value).subscribe(
      async (res) => {
        if(res){
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Guardado exitosamente! ',
            duration: 2000
          });
          toast.present();
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.status);

        // eslint-disable-next-line eqeqeq
        if (error.status == 0) {
          this.authService.logoutAviso();
        } else {
          console.log(error.status);
          alert(Errores.mostrar(error.status));
        }
      }
    );

  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get nombre() {
    return this.formCliente.controls.nombre as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get apellido() {
    return this.formCliente.controls.apellido as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get cedula() {
    return this.formCliente.controls.cedula as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get direccion() {
    return this.formCliente.controls.direccion as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get telefono() {
    return this.formCliente.controls.telefono as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get correo() {
    return this.formCliente.controls.correo as FormControl;
  }
}
