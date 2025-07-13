import { inject, Injectable } from '@angular/core';
import { FetchService } from '../fetch.service';

@Injectable({
  providedIn: 'root',
})
export class CircuitoService {
  private apiService: FetchService = inject(FetchService);

  async getAllCircuitosFromDepartamento() {
    try {
      const response = await this.apiService.get('circuito');
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
