import { BaseConfigOption } from './BaseConfigOption';

export class TitleConfigOption extends BaseConfigOption {
  key = 'formTitle';
  label = 'Form Title';
  defaultValue = '';

  validate(value: any): string | null {
    if (!value || typeof value !== 'string' || !value.trim()) {
      return 'Form title is required';
    }
    return null;
  }
}