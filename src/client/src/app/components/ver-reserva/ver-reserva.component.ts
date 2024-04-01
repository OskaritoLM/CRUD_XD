import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaModel } from '../../models/datosPModel';
import { ReservasService } from '../../services/reserva.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ver-reserva',
  templateUrl: './ver-reserva.component.html',
  styleUrls: ['./ver-reserva.component.css']
})

export class VerReservaComponent implements OnInit {
  reserva: ReservaModel = new ReservaModel();

  constructor(
    private route: ActivatedRoute,
    private reservasService: ReservasService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.reservasService.getReservaById(id).subscribe(
        (reserva: ReservaModel) => {
          this.reserva = reserva;
        },
        (error) => {
          console.error('Error al cargar la reserva:', error);
          this.router.navigate(['/']); // Redirigir a la página de inicio en caso de error
        }
      );
    }
  }
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  volver() {
    this.router.navigate(['/home-admin']); // Navegar de nuevo a la página de inicio
  }
}
