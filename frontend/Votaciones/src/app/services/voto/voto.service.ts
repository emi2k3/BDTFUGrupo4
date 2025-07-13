import { inject, Injectable } from '@angular/core';
import { FetchService } from '../fetch.service';

@Injectable({
  providedIn: 'root',
})
export class VotoService {
  private apiService: FetchService = inject(FetchService);
  async votar(body: any) {
    try {
      await this.apiService.post('votos/votar', JSON.stringify(body));
    } catch (error) {
      alert(error);
    }
  }
}
