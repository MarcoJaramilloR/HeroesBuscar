import { Component } from '@angular/core';
import { Heroe, HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes: Heroe[] = [];
  term: string = "";

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.term = params['terminoBusqueda'] || '';
      this.actualizarheroes();
    });
  }

  private actualizarheroes() {
    if (this.term === "") {
      this.heroes = this.heroesService.getHeroes();
    } else {
      this.heroes = this.heroesService.buscarHeroesTermino(this.term);
    }
  }

  verHeroe(heroe: Heroe) {
    const index = this.heroesService.getHeroes().findIndex(h => h === heroe);
    this.router.navigate(['/heroe', index]);
  }
}