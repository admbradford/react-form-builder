import { BaseField } from './BaseField';

export class CheckboxField extends BaseField {
  constructor(label: string) {
    super('checkbox', label);
    this.value = false;
  }

  validate(): string | null {
    if (this.value !== true) {
      return `${this.label} must be checked`;
    }
    return null;
  }
}