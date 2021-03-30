import { FirebaseAuthenticationService } from './../services/firebase-authentication.service';
import { Validators} from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from './usuario-model';
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
  userStatus$: any;
  flag!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fireAuth: FirebaseAuthenticationService
    ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });
  }

  userStatus() {
    this.userStatus$ = this.fireAuth.firebaseGetCurrentUser().then(user => this.userStatus$ = user);
    console.log(this.userStatus$);
    if (this.userStatus$) {
      this.flag = true;
      return true;
    }else {
      this.flag = false;
      return false;
    }
  }

  userLogout() {
    this.fireAuth.firebaseLogout();
  }
  // tslint:disable-next-line: typedef
  onSubmit(){
     this.fireAuth.firebaseLogin(
      this.formulario.controls.email.value, this.formulario.controls.senha.value)
      .then(user => {
        if (user) {
          this.formulario.reset();
          alert('Usuário ' + user.user?.email + 'logado com sucesso!');
                // navegar para dentro do site
          this.router.navigate(['#home']);
        }
      }, err => {
        if (err) {
          this.formulario.reset();
          alert('Usuário/Senha inválidos! Corrija as credenciais e tente novamente.');
        }
      }).catch((error) => console.log(error.code, error.message));
  }

}
