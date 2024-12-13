import { BaseConfigOption } from './BaseConfigOption';

export class DescriptionConfigOption extends BaseConfigOption {
  key = 'formDescription';
  label = 'Form Description';
  defaultValue = '';

  validate(value: any): string | null {
    return null;
  }
}