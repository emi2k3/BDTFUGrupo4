import { inject, Injectable } from '@angular/core';
import { FetchService } from '../fetch.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService: FetchService = inject(FetchService);
  async login(body: string) {
    try {
      const response = await this.apiService.post('auth/login', body);
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.log(error);
    }
  }
  getDepartamentoFromToken() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const decoded = jwtDecode<any>(token);
      const id_direccion = decoded.id_direccion;
      return id_direccion;
    } else {
      console.log('Error: No hay token');
    }
  }

  getIDCiudadanoFromToken() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const decoded = jwtDecode<any>(token);
      const id_ciudadano = decoded.id;
      return id_ciudadano;
    } else {
      console.log('Error: No hay token');
    }
  }

  getIDCredencialFromToken() {
    const token = localStorage.getItem('token');
    if (token != null) {
      const decoded = jwtDecode<any>(token);
      const id_credencial = decoded.id_credencial;
      return id_credencial;
    } else {
      console.log('Error: No hay token');
    }
  }
}
