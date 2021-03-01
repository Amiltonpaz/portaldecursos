import { Estado } from './estado';
import { DropdownService } from './../../services/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ViaCepService } from 'src/app/services/via-cep.service';
import { Professor } from '../professor-model';
import { DbProfessoresService } from '../services/db-professores.service';

@Component({
  selector: 'app-prof-cadastro',
  templateUrl: './prof-cadastro.component.html',
  styleUrls: ['./prof-cadastro.component.css']
})

export class ProfCadastroComponent implements OnInit {

  private readonly campoVazio: string = 'Campo obrigatório';
  private readonly formatoInvalido: string = 'Formato inválido';
  private readonly tamanhoMinimo: string = 'Não alcançou o tamanho mínimo requerido';
  private readonly tamanhoMaximo: string = 'Ultrapassou o tamanho máximo requerido';

 formulario!: FormGroup;
 prof: Professor = new Professor();
 estados: any;

  constructor(
    private fb: FormBuilder,
    private dbProf: DbProfessoresService,
    private viaCep: ViaCepService,
    private dropdown: DropdownService) { }

  ngOnInit(): void {

    this.getEstadosBr();
    this.criaFormulario();

  }

  criaFormulario() {

    this.formulario = this.fb.group({

      nome: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      foto: [null, Validators.required],
      email: [null, [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30)]],
      nascimento: [null, Validators.required],
      senha: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      cep: [null, Validators.required],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      uf: [null, Validators.required],
      estado: [null, Validators.required],
      numero: [null, Validators.required],
      termo: [null, Validators.pattern('true')]
    });

  }

  
  onSubmit() {

    if (this.formulario.valid) {

    this.prof = this.formulario.value;
    this.dbProf.postProfessor(this.prof, this.formulario);
    } else {

      Object.keys(this.formulario.controls).forEach(campo =>
        {console.log(campo);
         const controle = this.formulario.get(campo);
         controle?.markAsTouched();
        });

    }


  }

  expressaoValid(campo: string) {

    const controle = this.formulario.controls[campo];

    return controle.valid && controle.touched;
  }

  expressaoInvalid(campo: string) {
   // let controle = this.formulario.controls[campo]; Apenas ilustrando outra opção!
      const controle = this.formulario.get(campo);

      return !controle?.valid && controle?.touched;
  }

  verificaErro(campo: string) {
    const controle = this.formulario.get(campo);

    if (controle?.errors){

      if (controle?.hasError('required')){
        return this.campoVazio;
        } if (controle?.hasError('minlength')){
          return this.tamanhoMinimo + ' (' + controle?.errors.minlength.requiredLength.toString() + ')';
          } if (controle?.hasError('maxlength')){
          return this.tamanhoMaximo + ' (' + controle?.errors.maxlength.requiredLength.toString() + ')';
        } else {
          return this.formatoInvalido;
        }


    }
    return null;
  }

  retornaClasseErro(campo: string) {

    return {
      'is-valid': this.expressaoValid(campo),
      'is-invalid': this.expressaoInvalid(campo)
    };

  }

  pesquisaCep() {
    const valorCep = this.formulario.get('cep')?.value;
    this.viaCep.pesquisaCep(valorCep)
    .subscribe(dados =>
      {this.populaDados(dados);},
      (errors: any) => alert('Sem resposta da API de CEP.'));


  }

  populaDados(dados: any) {

    this.formulario.patchValue({
      'bairro': dados.bairro,
      'rua': dados.logradouro,
      'cidade': dados.localidade,
      'uf': dados.uf});

  }

  getEstadosBr() {

    this.estados = this.dropdown.getEstados();
  }


}
