import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrl: './heroe.component.css'
})
export class HeroeComponent {
  heroe:any={}; 
  constructor(
    private activatedRoute: ActivatedRoute,
    private HeroesService: HeroesService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.getHeroe(params['id']);
    });
  }

  getHeroe(id: string) {
    const terminoBusqueda = this.activatedRoute.snapshot.queryParams['terminoBusqueda'] || '';
  
    if (terminoBusqueda) {
      const heroes = this.HeroesService.buscarHeroesTermino(terminoBusqueda);
      this.heroe = heroes.find(h => h.nombre.toLowerCase() === id.toLowerCase());
    } else {
      this.heroe = this.HeroesService.getHeroePos(parseInt(id, 10));
    }
  
    if (!this.heroe) {
      this.router.navigate(['/heroes']);
    }
  
  }
}

