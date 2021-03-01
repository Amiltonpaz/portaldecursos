import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

constructor() { }

  // tslint:disable-next-line: typedef
  validaCep(control: FormControl) {

    const cep = control.value;
    if (cep && cep !== null) {

      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : {cepInvalido : true};
    } else {
      return null;
    }
  }

  // tslint:disable-next-line: typedef
  comparaValores(control: FormControl) {

    const email = control.get('email')?.value;
    const confirmaEmail = control.get('confirmaEmail')?.value;

    if (email === confirmaEmail) {
      return null;
    }
    return {valoresDiferentes : true};
  }

}
