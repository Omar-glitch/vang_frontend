import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function stringValidator({
  minLength,
  maxLength,
}: {
  minLength: number;
  maxLength: number;
}): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value)
      return {
        stringValidator: { value: control.value, message: 'Es requerido' },
      };
    if (typeof control.value !== 'string')
      return {
        stringValidator: { value: control.value, message: 'Debe ser string' },
      };
    const val = control.value.trim();
    if (val.length < minLength)
      return {
        stringValidator: {
          value: control.value,
          message: `Mínimo ${minLength} letras`,
        },
      };
    if (val.length > maxLength)
      return {
        stringValidator: {
          value: control.value,
          message: `Máximo ${maxLength} letras`,
        },
      };
    return null;
  };
}

export const errorOf = (field: string, form: FormGroup) => {
  const fieldValue = form.get(field);
  if (!fieldValue) return '';
  if (fieldValue.errors)
    return fieldValue.errors['stringValidator'].message as string;
  return '';
};
