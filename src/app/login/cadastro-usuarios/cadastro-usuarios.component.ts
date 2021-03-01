import { ValidaCssService } from './../../services/validaCss.service';
import { ViaCepService } from './../../services/via-cep.service';
import { ValidationService } from './../../services/validation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { camposIguais } from 'src/app/services/comparaCampos';
import { distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { empty, interval } from 'rxjs';



@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.css']
})
export class CadastroUsuariosComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private db: UsuariosService,
    private snackBar: MatSnackBar,
    private validation: ValidationService,
    private viaCep: ViaCepService,
    private validaCss: ValidaCssService

  ) { }

  formulario!: FormGroup;

  interesses = ['Node.js', 'Angular', 'PWA', 'React', 'Vue.js', 'MongoDB'];

  ngOnInit() {

      this.formulario = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      confirmaEmail: [null, [Validators.required, Validators.email]],
      whatsapp: [null, Validators.required],
      senha: [null, Validators.required],
      confirmarSenha: [null, Validators.required],
      cep: [null, [Validators.required, this.validation.validaCep]],
      rua: [null],
      numero: [null],
      bairro: [null],
      cidade: [null],
      estado: [null],
      interesses: this.buildInteresses(),
      newsletter: [null],
      termo: [null]
    }, {validator: camposIguais});

      // Instrução reativa para controle de CEP;
      this.formulario.controls.cep.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(status => console.log('valor CEP', status)),
        switchMap(status => status === 'VALID' ?
          this.viaCep.pesquisaCep(this.formulario.controls.cep.value)
          // tslint:disable-next-line: deprecation
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDados(dados) : {});

      // Instrução reativa para controle de confirmação de email;
      // TODO

  }

  buildInteresses() {
    const values = this.interesses.map(v => new FormControl(false));
    return this.fb.array(values);
  }

  onSubmit() {

    console.log(this.formulario.controls.email.value === this.formulario.controls.confirmaEmail.value);

    if (this.formulario.valid) {

      console.log('formulario valido');
      this.db.postNovoUsuario(this.formulario);
    } else {
      console.log('formulario inválido');
      console.log(this.formulario);
    }
  }

  buscaCep() {

    if (this.formulario.controls.cep.valid) {
        this.viaCep.pesquisaCep(this.formulario.controls.cep.value)
        .subscribe(dados => this.populaDados(dados));
  }
  }

  populaDados(dados: any) {

    this.formulario.patchValue({

      cep: dados.cep,
      rua: dados.logradouro,
      numero: dados.numero,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    });
  }

  // Validações Css Customizadas

  retornaClasseErro(campo: string) {

    const classe = this.validaCss.retornaClasseErro(campo, this.formulario);
    return classe;

  }

  // tslint:disable-next-line: typedef
  verificaErro(campo: string): string | null{

    return this.validaCss.verificaErro(campo, this.formulario);
  }

}
