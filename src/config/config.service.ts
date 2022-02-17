import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

@Injectable()
export class ConfigService {
  database: {
    host: string;
  };

  constructor() {
    ConfigService.loadFromEnvFile();
    const envConfig = ConfigService.validateInput();
    this.setAllValues(envConfig);
  }

  private static loadFromEnvFile() {
    dotenv.config();
  }

  private static validateInput(): Joi.ObjectSchema {
    const envVarsSchema = Joi.object({
      DB_HOST: Joi.string().required(),
    });

    const vars = Object.assign({}, process.env) as any;
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(vars, {
      stripUnknown: true,
    });
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  private setAllValues(envConfig: { [varName: string]: any }) {
    this.database = {
      host: envConfig.DB_HOST,
    };
  }
}
