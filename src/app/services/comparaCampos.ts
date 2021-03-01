import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const camposIguais: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.get('email');
  const confirmaEmail = control.get('confirmaEmail');

  return (email && confirmaEmail ? (email.value === confirmaEmail.value ? null : { valoresNaoCoincidem: true }) : null);
};
