import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { stringValidator } from '../../../utils/validators';
import { ClientModel } from '../../../../models/ClientModel';

@Component({
  selector: 'app-update-client-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-client-form.component.html',
  styleUrl: './update-client-form.component.css',
})
export class UpdateClientFormComponent {
  @Input({ required: true }) formId = '';
  @Input({ required: true }) formValues: ClientModel = {
    _id: '',
    contact: '',
    name: '',
  };

  updateClientForm = new FormGroup({
    name: new FormControl(this.formValues.name, [
      stringValidator({ minLength: 3, maxLength: 12 }),
    ]),
    contact: new FormControl(this.formValues.contact, [
      stringValidator({ minLength: 4, maxLength: 32 }),
    ]),
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formValues']) {
      const f = changes['formValues'].currentValue as ClientModel;
      this.updateClientForm.setValue({ name: f.name, contact: f.contact });
    }
  }

  // fieldError = (field: string) => {
  //   return hasError(field, this.newClientForm);
  // };

  // hasError = (field: string) => {
  //   const fieldValue = this.newClientForm.get(field);
  //   if (!fieldValue) return '';
  //   if (fieldValue.errors)
  //     return fieldValue.errors['stringValidator'].message as string;
  //   return '';
  // };

  // showErrors = () => {
  //   const field = this.newClientForm.get('name');
  //   console.log(field?.errors);
  //   console.log(this.newClientForm.errors);

  // };

  onSubmit = async () => {
    console.log('editting');
    // try {
    //   const putClient = await axios.put(
    //     `http://localhost:3000/clients/${this.formValues._id}`,
    //     this.updateClientForm.value
    //   );
    //   console.log(putClient.data);
    // } catch (e) {
    //   console.log(e);
    // }
  };
}
