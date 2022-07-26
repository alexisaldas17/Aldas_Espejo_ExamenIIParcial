import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Errores } from 'src/app/Entidades/MensajeError';
import { Registro } from 'src/app/modelos/registro';
import { Cliente } from 'src/app/modelos/cliente';
import { AuthService } from 'src/app/servicios/auth.service';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registro: FormGroup;
  password_type = 'password';
  signUpForm: FormGroup;
  valoresRegistro: Registro;
  cliente: Cliente;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    public toastController: ToastController
  ) {
    this.cliente = new Cliente(
      '',
      '',
      '',
      '',
      '',
      '',
    );
    this.valoresRegistro = {
      usuario: '',
      password: '',
      cliente: this.cliente,
    };
    this.registro = this.fb.group({
      usuario: ['', [Validators.required,
      Validators.maxLength(10),RegistroPage.AEvalidarCedula]],
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      apellido: ['', [Validators.required, Validators.minLength(1)]],
      direccion: ['', [Validators.required, Validators.minLength(1)]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$'),
        ],
      ],
    });
  }

  ngOnInit() { }
  submitSignupForm() { }
  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }
  async guardarRegistro() {
    this.cliente = new Cliente(
      this.usuario.value,
      this.nombre.value,
      this.apellido.value,
      this.direccion.value,
      this.telefono.value,
      this.correo.value,
    );

    console.log(this.valoresRegistro);
    // eslint-disable-next-line eqeqeq
    if (this.password.value != this.confirmPassword.value) {
      const toast = await this.toastController.create({
        message: 'Contraseñas no coinciden! ',
        duration: 2000,
      });
      toast.present();
    } else {
      const loading = await this.loadingController.create();
      await loading.present();
      this.valoresRegistro = {
        usuario: this.usuario.value,
        password: this.password.value,
        cliente: this.cliente
      };
      this.authService.registrarUsuario(this.valoresRegistro).subscribe(
        async (res) => {
          if (res) {
            await loading.dismiss();
            const toast = await this.toastController.create({
              message: 'Registro existoso! ',
              duration: 2000,
            });
            toast.present();
            this.router.navigate(['/login']);
          } else {
            await loading.dismiss();
            const toast = await this.toastController.create({
              message: 'Usuario ya se encuentra registrado! ',
              duration: 2000,
            });
            toast.present();
          }
        },
        (error: HttpErrorResponse) => {
          // eslint-disable-next-line eqeqeq
          if (error.status == 401) {
            this.authService.logoutAviso();
            loading.dismiss();
          } else {
            alert(Errores.mostrar(error.status));
            loading.dismiss();
          }
        }
      );
    }
  }

  // matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  //   // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
  //   return (group: FormGroup): { [key: string]: any } => {
  //     const password = group.controls[passwordKey];
  //     const confirmPassword = group.controls[confirmPasswordKey];

  //     if (password.value !== confirmPassword.value) {
  //       return {
  //         mismatchedPasswords: true,
  //       };
  //     }
  //   };
  // }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get password() {
    return this.registro.controls.password as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get confirmPassword() {
    return this.registro.controls.confirmPassword as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get direccion() {
    return this.registro.controls.direccion as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get telefono() {
    return this.registro.controls.telefono as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get correo() {
    return this.registro.controls.correo as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get usuario() {
    return this.registro.controls.usuario as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get nombre() {
    return this.registro.controls.nombre as FormControl;
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get apellido() {
    return this.registro.controls.apellido as FormControl;
  }

  static AEvalidarCedula(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (cedula.length == 10) {
      var digito_region = (cedula.substring(0, 2));
      if (digito_region >= 1 && digito_region <= 24) {
        var ultimo_digito = cedula.substring(9, 10);
        var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));
        var numero1 = parseInt(cedula.substring(0, 1));
        var numero1 = (numero1 * 2);
        if (numero1 > 9) { var numero1 = (numero1 - 9); }
        var numero3 = parseInt(cedula.substring(2, 3));
        var numero3 = (numero3 * 2);
        if (numero3 > 9) { var numero3 = (numero3 - 9); }
        var numero5 = parseInt(cedula.substring(4, 5));
        var numero5 = (numero5 * 2);
        if (numero5 > 9) { var numero5 = (numero5 - 9); }
        var numero7 = parseInt(cedula.substring(6, 7));
        var numero7 = (numero7 * 2);
        if (numero7 > 9) { var numero7 = (numero7 - 9); }
        var numero9 = parseInt(cedula.substring(8, 9));
        var numero9 = (numero9 * 2);
        if (numero9 > 9) { var numero9 = (numero9 - 9); }
        var impares = numero1 + numero3 + numero5 + numero7 + numero9;
        var suma_total = (pares + impares);
        var primer_digito_suma = String(suma_total).substring(0, 1);
        var decena = (parseInt(primer_digito_suma) + 1) * 10;
        var digito_validador = decena - suma_total;
        if (digito_validador == 10)
          var digito_validador = 0;
        if (digito_validador == ultimo_digito) {
          return null
        }
      }
    }
    return { validarCedula: true };
  }

}
