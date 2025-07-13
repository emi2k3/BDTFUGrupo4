import { inject, Injectable } from '@angular/core';
import { FetchService } from '../fetch.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CircuitoService {
  private apiService: FetchService = inject(FetchService);
  private authService = inject(AuthService);

  async getAllCircuitosFromDepartamento() {
    try {
      const response = await this.apiService.get('circuito');
      const userIdDireccion = this.authService.getDepartamentoFromToken();
      console.log(userIdDireccion);
      const responseFiltered = response.filter(
        (ciruito: any) => ciruito.id_direccion == userIdDireccion
      );
      return responseFiltered;
    } catch (error) {
      console.log(error);
    }
  }

  async getListaCredencialesFromCircuito(id_circuito: string) {
    try {
      const response = await this.apiService.get(
        `circuito/lista-credenciales/${id_circuito}`
      );
      return response || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async checkIfCredencialinLista(id_credencial: string, id_circuito: string) {
    try {
      const lista_credenciales = await this.getListaCredencialesFromCircuito(
        id_circuito
      );

      if (!Array.isArray(lista_credenciales)) {
        return false;
      }

      return !lista_credenciales.some(
        (item) => item.id_credencial == id_credencial
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
