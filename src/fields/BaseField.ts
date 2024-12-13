export abstract class BaseField {
    id: string;
    label: string;
    placeholder?: string;
    type: string;
    value: any;
  
    constructor(type: string, label: string, placeholder?: string) {
      this.type = type;
      this.label = label;
      this.placeholder = placeholder;
      this.id = Math.random().toString(36).substr(2, 9);
    }
  
    abstract validate(): string | null;
  }