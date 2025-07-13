import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {
  credencial: string = '';
  cedula: string = '';
  loginUser?: {};
  private authService = inject(AuthService);
  async onSubmit() {
    const splitedCredencial = this.credencial.split(' ');
    console.log(splitedCredencial[0], splitedCredencial[1]);
    this.loginUser = {
      serie: splitedCredencial[0],
      numero: splitedCredencial[1],
      ci: this.cedula,
    };
    console.log(this.loginUser);
    await this.authService.login(JSON.stringify(this.loginUser));
  }
}
