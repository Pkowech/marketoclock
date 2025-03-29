// src/config/config.service.ts
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    const configFile = fs.existsSync(filePath) ? filePath : '.env';
    this.envConfig = dotenv.parse(fs.readFileSync(configFile));
  }

  get(key: string): string {
    return this.envConfig[key] || process.env[key] || '';
  }
}
