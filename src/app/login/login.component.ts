import { Validators} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from './usuario-model';
import { UsuariosService } from './services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario!: Usuario;
  formulario!: FormGroup;

  constructor(
    private userService: UsuariosService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });
    
  }

  // tslint:disable-next-line: typedef
  onSubmit(){
    console.log('passou pelo onSubmit!');
    // tslint:disable-next-line: no-string-literal
    this.login(this.formulario.controls['email'].value, this.formulario.controls['senha'].value);
  }
  // tslint:disable-next-line: typedef
  login(email: string, senha: string) {

    this.usuario = new Usuario();

    this.usuario.email = email;
    this.usuario.senha = senha;
    if (this.userService.verificaUsuario(this.usuario)) {

      this.router.navigate(['#home']);
    } else {
      this.formulario.reset();
    }
  }

}
