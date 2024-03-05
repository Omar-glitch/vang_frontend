import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function stringValidator({
  minLength,
  maxLength,
  regex,
  list,
}: {
  minLength: number;
  maxLength: number;
  regex?: { value: RegExp; message: string };
  list?: readonly string[];
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
    if (regex && !regex.value.test(val))
      return {
        stringValidator: {
          value: control.value,
          message: regex.message,
        },
      };
    if (list && !list.includes(val))
      return {
        stringValidator: {
          value: control.value,
          message: `Valor no permitido`,
        },
      };
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

export function numberValidator({
  min,
  max,
}: {
  min: number;
  max: number;
}): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value)
      return {
        numberValidator: { value: control.value, message: 'Es requerido' },
      };
    const val = parseInt(control.value);
    if (typeof val !== 'number')
      return {
        numberValidator: { value: control.value, message: 'Debe ser número' },
      };
    if (val < min)
      return {
        numberValidator: {
          value: control.value,
          message: `Mínimo ${min}`,
        },
      };
    if (val > max)
      return {
        numberValidator: {
          value: control.value,
          message: `Máximo ${max}`,
        },
      };
    return null;
  };
}

export const errorOf = (field: string, form: FormGroup) => {
  const fieldValue = form.get(field);
  if (!fieldValue) return '';
  if (fieldValue.errors) {
    if (fieldValue.errors['stringValidator'])
      return fieldValue.errors['stringValidator'].message as string;
    if (fieldValue.errors['numberValidator'])
      return fieldValue.errors['numberValidator'].message as string;
  }
  return '';
};
