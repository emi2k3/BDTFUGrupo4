import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircuitoService } from '../../services/circuito/circuito.service';
@Component({
  selector: 'app-circuitos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circuitos.component.html',
  styleUrl: './circuitos.component.css',
})
export class CircuitosComponent {
  Circuitos: any[] = [];
  private circuitoService = inject(CircuitoService);
  ngOnInit(): void {
    this.cargarCircuitos();
  }
  async cargarCircuitos() {
    this.Circuitos =
      await this.circuitoService.getAllCircuitosFromDepartamento();
  }
}
