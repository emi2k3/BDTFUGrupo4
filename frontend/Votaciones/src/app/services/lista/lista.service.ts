import { Injectable, inject } from '@angular/core';
import { FetchService } from '../fetch.service';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private apiService: FetchService = inject(FetchService);

  async getAllListasFromDepartamento() {
    try {
      const response = await this.apiService.get('lista');
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
