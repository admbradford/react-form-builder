import { BaseField } from './BaseField';

export class TextField extends BaseField {
  constructor(label: string, placeholder?: string) {
    super('text', label, placeholder);
    this.value = '';
  }

  validate(): string | null {
    if (!this.value || this.value.trim() === '') {
      return `${this.label} is required`;
    }
    return null;
  }
}