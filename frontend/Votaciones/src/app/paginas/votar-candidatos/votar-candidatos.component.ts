import { Component, inject } from '@angular/core';
import { ListaService } from '../../services/lista/lista.service';
import { CommonModule } from '@angular/common';
import { VotoService } from '../../services/voto/voto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votar-candidatos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './votar-candidatos.component.html',
  styleUrl: './votar-candidatos.component.css',
})
export class VotarCandidatosComponent {
  Listas: any[] = [];
  private listaService = inject(ListaService);
  private votoService = inject(VotoService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarListas();
  }
  async cargarListas() {
    this.Listas = await this.listaService.getAllListasFromDepartamento();
  }

  onClick() {
    console.log('entro');
    this.router.navigate(['/listas/votar']);
  }
}
