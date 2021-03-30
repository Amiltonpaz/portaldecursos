
import { ResNoticias } from './../noticias/artigos-model';
import { Resposta } from './../noticias/response-model';
import { Fontes } from './../noticias/fontes-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';







@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private readonly API_SOURCES = 'https://newsapi.org/v2/sources?country=br&category-technology&apiKey=e352d92a6cbc41f5aca777b3cec39ee6';

  private readonly API_NOTICIAS_TI = 'https://newsapi.org/v2/top-headlines?country=br&category=technology&apiKey=e352d92a6cbc41f5aca777b3cec39ee6';

  constructor(
    private http: HttpClient
    ) { }


  getSources(){

    return this.http.get<Resposta>(this.API_SOURCES);
  }

  getNoticias() {
    return this.http.get<ResNoticias>(this.API_NOTICIAS_TI);
  }

}
