import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as Joi from 'joi'

@Injectable()
export class ConfigService {
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  }
  auth: {
    jwt: string
  }

  constructor() {
    ConfigService.loadFromEnvFile()
    const envConfig = ConfigService.validateInput()
    this.setAllValues(envConfig)
  }

  private static loadFromEnvFile() {
    dotenv.config()
  }

  private static validateInput(): Joi.ObjectSchema {
    const envVarsSchema = Joi.object({
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
      JWT_SECRET: Joi.string().required()
    })

    const vars = { ...process.env } as any
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(vars, {
      stripUnknown: true,
    })
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return validatedEnvConfig
  }

  private setAllValues(envConfig: { [varName: string]: any }) {
    this.database = {
      host: envConfig.DB_HOST,
      port: envConfig.DB_PORT,
      username: envConfig.DB_USERNAME,
      password: envConfig.DB_PASSWORD,
      name: envConfig.DB_NAME,
    }
    this.auth = {
      jwt: envConfig.JWT_SECRET
    }
  }
}
