import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidaCssService {
  msgCampoVazio = 'Campo obrigatório.';
  msgTamanhoMinimo = 'Não alcançou o tamanho mínimo requerido';
  msgTamanhoMaximo = 'Ultrapassou o tamanho máximo requerido';
  msgFormatoInvalido = 'Formato inválido';
  msgEmailInvalido = 'Formato de e-mail inválido.';
  msgValoresDiferentes = 'Os valores não coincidem.';

  constructor() {}

  expressaoValid(campo: string, formulario: FormGroup) {
    const controle = formulario.controls[campo];

    return controle.valid && controle.touched;
  }

  expressaoInvalid(campo: string, formulario: FormGroup) {
    // let controle = this.formulario.controls[campo]; Apenas ilustrando outra opção!
    const controle = formulario.get(campo);

    return (!controle?.valid && !controle?.pristine ||
      (formulario.invalid && formulario.hasError('valoresNaoCoincidem') && controle.touched));
  }

  // tslint:disable-next-line: typedef
  verificaErro(campo: string, formulario: FormGroup) {
    const controle = formulario.get(campo);

    if (controle?.errors) {
      if (controle?.hasError('required')) {
        return this.msgCampoVazio;
      }
      if (controle?.hasError('minlength')) {
        return (
          this.msgTamanhoMinimo +
          ' (' +
          controle?.errors.minlength.requiredLength.toString() +
          ')'
        );
      }
      if (controle?.hasError('maxlength')) {
        return (
          this.msgTamanhoMaximo +
          ' (' +
          controle?.errors.maxlength.requiredLength.toString() +
          ')'
        );
      }
      if (controle?.hasError('email')) {
        return this.msgEmailInvalido;
      }
      if (controle?.hasError('valoresNaoCoincidem')) {
        return this.msgValoresDiferentes;
      } else {
        return this.msgFormatoInvalido;
      }
    }
    return null;
  }

  retornaClasseErro(campo: string, formulario: FormGroup): string {
    if (this.expressaoInvalid(campo, formulario)) {
      return 'is-invalid';
    }
    if (this.expressaoValid(campo, formulario)) {
      return 'is-valid';
    }
    return '';
  }
}
