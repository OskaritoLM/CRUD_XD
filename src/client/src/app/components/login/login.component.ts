import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/datosPModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: UsuarioModel = new UsuarioModel(); // Inicializamos el objeto usuario con los valores por defecto

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login(): void {
    if (this.usuario.correo && this.usuario.contrasena) {
      this.usuarioService.getusuariosByEmail(this.usuario.correo).subscribe(
        (usuario: UsuarioModel) => {
          if (usuario && usuario.contrasena === this.usuario.contrasena) {
            console.log('Login exitoso');
            this.router.navigate(['/admin-home']);
          } else {
            console.log('Credenciales inválidas');
          }
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.log('Correo electrónico y contraseña son obligatorios');
    }
  }
}
