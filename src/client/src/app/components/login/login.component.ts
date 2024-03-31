import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/datosPModel';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario: UsuarioModel = new UsuarioModel(); // Inicializamos el objeto usuario con los valores por defecto

  constructor(private usuarioService: UsuarioService, public auth: AuthService,private router: Router) {}
  showLogoutButton: boolean = false;
  login(){
    this.auth.logout()
  }

  toggleLogoutButton() {
    this.showLogoutButton = !this.showLogoutButton;
  }
}
