// auth0-service.service.ts
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {

  constructor() { }

  // Método para recuperar los roles de un usuario específico
  getRolesForUser(userId: string) {
    // Reemplaza TU_TOKEN_DE_ACCESO_A_API con tu propio token de acceso a la API Management
    const accessToken = 'B3GOwce3bfdgPrQE1WByhPTblbpol1iq';
    const domain = 'mlbar.us.auth0.com';

    // Configura la solicitud para recuperar los roles
    const options = {
      method: 'GET',
      url: `https://${domain}/api/v2/users/${userId}/roles`, // Reemplaza {userId} por el ID del usuario
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
        'cache-control': 'no-cache'
      }
    };

    // Realiza la solicitud para recuperar los roles asignados al usuario
    return axios.request(options);
  }
}
