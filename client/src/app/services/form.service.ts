import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ValidatorsOf } from '../models/utils.models';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  /**
   *
   * @param keys
   * @param object
   * @param validators
   */
  createForm<T extends Record<keyof T, any>>(keys: (keyof T)[], object: Partial<T>, validators?: ValidatorsOf<T>): FormGroup {
    const form: Record<string, FormControl> = {};

    for (const key of keys) {
      form[key as string] = new FormControl(object[key], validators?.[key] ?? []);
    }

    return new FormGroup(form);
  }
}