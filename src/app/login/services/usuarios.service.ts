import { map, tap, filter, pluck } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Usuario } from './../usuario-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, Observable } from 'rxjs';



interface UserResponse {
  Usuarios: Array<Usuario>;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly API = 'http://localhost:3000/usuarios';
  lista: any;
  listaUsuarios: any;
  authorization = false;
  temp!: Usuario[];

constructor(private http: HttpClient) { }


// tslint:disable-next-line: typedef
verificaUsuario(usuario: Usuario) {

this.getUsuarios(usuario);

return true;

}

postNovoUsuario(formulario: FormGroup) {

 this.http.post<FormGroup>(this.API, formulario.value).subscribe(form => { console.log(form); } );
}

// tslint:disable-next-line: typedef
mapUsers(usuarios: any): UserResponse {
  return usuarios.map((user: Usuario) => ({
    email: user.email,
    senha: user.senha
  }));
}

// tslint:disable-next-line: typedef
getUsuarios(usuario: Usuario){

  const chamada = this.http.get<Usuario[]>(this.API);
  return chamada.pipe(
   map((dados: Usuario[]) => dados.filter((item: Usuario) => {
      item.email === usuario.email;
   })),
   map((dados: any[]) => dados.length > 0),
   tap(console.log)
  ).subscribe();


}

verificaEmail(email: string) {
  this.http.get<Usuario[]>(this.API).pipe(
    map((dados: Usuario[]) => dados.filter((item: Usuario) => item.email === email)),
    map((dados: any[]) => dados.length > 0),
    tap(console.log)
  ).subscribe();
}

}
