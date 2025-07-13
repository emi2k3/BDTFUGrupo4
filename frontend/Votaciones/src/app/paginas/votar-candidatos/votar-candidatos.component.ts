import { Component, inject } from '@angular/core';
import { ListaService } from '../../services/lista/lista.service';
import { CommonModule } from '@angular/common';
import { VotoService } from '../../services/voto/voto.service';
import { CircuitoService } from '../../services/circuito/circuito.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

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
  private circuitoService = inject(CircuitoService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private idCircuito: string | null = null;

  ngOnInit(): void {
    this.cargarListas();
    this.route.paramMap.subscribe((params) => {
      this.idCircuito = params.get('id');
    });
  }
  async cargarListas() {
    this.Listas = await this.listaService.getAllListasFromDepartamento();
  }

  async votarPartido(id_eleccion: number, lista_id: number) {
    const id_credencial = await this.authService.getIDCredencialFromToken();
    if (this.idCircuito != null) {
      const observado = await this.circuitoService.checkIfCredencialinLista(
        String(id_credencial),
        this.idCircuito
      );

      const id_ciudadano = await this.authService.getIDCiudadanoFromToken();

      this.votoService.votar({
        estado: 'valido',
        observado: observado,
        id_circuito: Number(this.idCircuito),
        id_eleccion: id_eleccion,
        lista_id: lista_id,
        id_ciudadano: id_ciudadano,
      });
    } else {
      window.alert('Tiene que votar desde un circuito');
    }
  }

  onClick(id_eleccion: number, lista_id: number) {
    const confirmacion = window.confirm(
      '¿Estás seguro de que deseas votar a este partido?'
    );
    if (confirmacion) {
      this.votarPartido(id_eleccion, lista_id);
    }
  }
}
