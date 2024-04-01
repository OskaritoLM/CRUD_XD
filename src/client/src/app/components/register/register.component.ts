import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any; // Declara una propiedad 'user' para almacenar la información del usuario

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Obtén la información del usuario actual al iniciar el componente
    this.authService.user$.subscribe(user => {
      this.user = user; // Asigna la información del usuario a la propiedad 'user'
    });
  }
}
