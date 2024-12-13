import { BaseField } from './BaseField';

type FieldConstructor = { new(label: string): BaseField };

export class FieldRegistry {
  private registry: Record<string, FieldConstructor> = {};

  registerField(type: string, ctor: FieldConstructor): void {
    this.registry[type] = ctor;
  }

  createField(type: string, label: string): BaseField | null {
    const Ctor = this.registry[type];
    if (!Ctor) return null;
    return new Ctor(label);
  }

  getRegisteredTypes(): string[] {
    return Object.keys(this.registry);
  }
}