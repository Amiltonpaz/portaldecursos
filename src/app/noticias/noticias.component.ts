import { Artigo } from './artigos-model';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Fontes } from './fontes-model';
import { NewsService } from './../services/news.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  fontes!: Observable<Fontes[]>;
  simples!: Fontes[];
  artigos!: Artigo[];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.obterFontes();
    this.obternoticias();
  }

  obterFontes() {
   this.newsService.getSources().pipe(
     map( res => {
       this.simples = res.sources;
     })
   ).subscribe();
  }

  obternoticias() {
    this.newsService.getNoticias().pipe(
      map(res => {
        this.artigos = res.articles;
      })
    ).subscribe();
  }

}
