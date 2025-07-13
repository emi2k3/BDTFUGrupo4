import { inject, Injectable } from '@angular/core';
import { FetchService } from '../fetch.service';

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
}
