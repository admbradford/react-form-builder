import { BaseConfigOption } from './BaseConfigOption';

export class ConfigRegistry {
  private configs: Record<string, BaseConfigOption> = {};

  registerConfig(key: string, option: BaseConfigOption): void {
    this.configs[key] = option;
  }

  getConfig(key: string): BaseConfigOption | undefined {
    return this.configs[key];
  }

  validateAll(config: Record<string, any>): string[] {
    return Object.entries(config).reduce((errs, [key, val]) => {
      const opt = this.getConfig(key);
      if (opt) {
        const err = opt.validate(val);
        if (err) errs.push(err);
      }
      return errs;
    }, [] as string[]);
  }
}