import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {
  credencial: string = '';
  cedula: string = '';
  loginUser?: {};
  private authService = inject(AuthService);
  private router = inject(Router);
  async onSubmit() {
    const splitedCredencial = this.credencial.split(' ');
    this.loginUser = {
      serie: splitedCredencial[0],
      numero: splitedCredencial[1],
      ci: this.cedula,
    };
    await this.authService.login(JSON.stringify(this.loginUser));
    if (localStorage.getItem('token')) this.router.navigate(['circuitos']);
  }
}
