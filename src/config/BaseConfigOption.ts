export abstract class BaseConfigOption {
    abstract key: string;
    abstract label: string;
    abstract defaultValue: any;
  
    validate(value: any): string | null {
      return null;
    }
  }