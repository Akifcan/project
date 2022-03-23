import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as Joi from 'joi'

@Injectable()
export class ConfigService {
  redis: {
    host: string,
    port: number
  }
  elasticSearch: {
    host: string,
    username: string,
    password: string,
    index: {
      assistant: string
    }
  }
  mapbox: {
    apiKey: string
  }
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  }
  firerbase: {
    apiKey: string
    authDomain: string
    storageBucket: string
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
      JWT_SECRET: Joi.string().required(),
      FIREBASE_API_KEY: Joi.string().required(),
      FIREBASE_AUTH_DOMAIN: Joi.string().required(),
      FIREBASE_STORAGE_BUCKET: Joi.string().required(),
      REDIS_HOST: Joi.string().required(),
      REDIS_PORT: Joi.number().required(),
      ELASTICSEARCH_NODE: Joi.string().required(),
      ELASTICSEARCH_USERNAME: Joi.string().required(),
      ELASTICSEARCH_PASSWORD: Joi.string().required(),
      ELASTICSEARCH_INDEX_ASSISTANT: Joi.string().required(),
      MAPBOX_API_KEY: Joi.string().required(),
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
    this.mapbox = {
      apiKey: envConfig.MAPBOX_API_KEY
    }
    this.redis = {
      host: envConfig.REDIS_HOST,
      port: envConfig.REDIS_PORT
    }
    this.elasticSearch = {
      host: envConfig.ELASTICSEARCH_NODE,
      username: envConfig.ELASTICSEARCH_USERNAME,
      password: envConfig.ELASTICSEARCH_PASSWORD,
      index: {
        assistant: envConfig.ELASTICSEARCH_INDEX_ASSISTANT
      }
    }
    this.firerbase = {
      authDomain: envConfig.FIREBASE_AUTH_DOMAIN,
      storageBucket: envConfig.FIREBASE_STORAGE_BUCKET,
      apiKey: envConfig.FIREBASE_API_KEY,
    }
    this.auth = {
      jwt: envConfig.JWT_SECRET
    }
  }
}
