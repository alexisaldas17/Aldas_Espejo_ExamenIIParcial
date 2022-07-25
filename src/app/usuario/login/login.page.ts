import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Errores } from 'src/app/Entidades/MensajeError';
import { User } from 'src/app/modelos/user';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  usuario: User;
  password_type = 'password';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    public toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.usuario = {
      usuario: '',
      contraseña: '',
    };
    this.credentials = this.fb.group({
      usuario: ['', [Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
      password: ['', [Validators.required, Validators.minLength(4),
        ]],
    });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() {
    return this.credentials.controls;
  }
  togglePasswordMode() {
    this.password_type = this.password_type === 'text' ? 'password' : 'text';
  }
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.usuario.contraseña = this.credentials.value.password;
    this.usuario.usuario = this.credentials.value.usuario;
    this.authService.login(this.usuario).subscribe(
      async (res) => {
        console.log(res);
        if(res!=null){
          //await alert.present();
          await loading.dismiss();
          this.router.navigateByUrl('/productos', { replaceUrl: true });
        }else{
          await loading.dismiss();

          const toast = await this.toastController.create({
            message: 'Usuario y/o contraseña incorrecto/s! ',
            duration: 2000,
          });
          toast.present();
        }

      },
        async (error: HttpErrorResponse) => {
        // eslint-disable-next-line eqeqeq
        if (error.status == 401) {
          this.authService.logoutAviso();
           loading.dismiss();
        } else {
          await loading.dismiss();

          const toast = await this.toastController.create({
            message: 'Usuario y/o contraseña incorrecto/s! ',
            duration: 2000,
          });
          toast.present();
        }
      }
    );
  }
  // Easy access for form fields
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get Usuario() {
    return this.credentials.controls.usuario as FormControl;
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  get password() {
    return this.credentials.get('password');
  }
}
