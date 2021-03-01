import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../alunos/cadastro-de-alunos/endereco';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {


  constructor(private http: HttpClient) { }

pesquisaCep(cep: number) {
  let url = `https://viacep.com.br/ws/${cep}/json`;

  return this.http.get<Endereco>(url);

}


}
