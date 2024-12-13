import { BaseField } from './BaseField';

export class NumberField extends BaseField {
  constructor(label: string) {
    super('number', label);
    this.value = 0;
  }

  validate(): string | null {
    if (this.value === null || this.value === undefined || this.value === '') {
      return `${this.label} is required`;
    }
    const parsed = Number(this.value);
    if (isNaN(parsed)) {
      return `${this.label} must be a number`;
    }
    return null;
  }
}