import { Component } from '@angular/core';
import { Login } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Login],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
