import { Injectable } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as Joi from 'joi'

@Injectable()
export class ConfigService {
  redis: {
    host: string,
    port: number,
    password: string,
    username: string
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
    apiKey: string,
    baseUrl: string
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
      APP_MODE: Joi.string().valid("development", "production").required(),

      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),

      P_DB_HOST: Joi.string().required(),
      P_DB_PORT: Joi.number().required(),
      P_DB_USERNAME: Joi.string().required(),
      P_DB_PASSWORD: Joi.string().required(),
      P_DB_NAME: Joi.string().required(),

      JWT_SECRET: Joi.string().required(),

      FIREBASE_API_KEY: Joi.string().required(),
      FIREBASE_AUTH_DOMAIN: Joi.string().required(),
      FIREBASE_STORAGE_BUCKET: Joi.string().required(),

      REDIS_HOST: Joi.string().required(),
      REDIS_PORT: Joi.number().required(),
      REDIS_USERNAME: Joi.optional(),
      REDIS_PASSWORD: Joi.optional(),

      P_REDIS_HOST: Joi.string().required(),
      P_REDIS_PORT: Joi.number().required(),
      P_REDIS_USERNAME: Joi.optional(),
      P_REDIS_PASSWORD: Joi.optional(),

      ELASTICSEARCH_NODE: Joi.string().required(),
      ELASTICSEARCH_USERNAME: Joi.string().required(),
      ELASTICSEARCH_PASSWORD: Joi.string().required(),

      P_ELASTICSEARCH_NODE: Joi.string().required(),
      P_ELASTICSEARCH_USERNAME: Joi.string().required(),
      P_ELASTICSEARCH_PASSWORD: Joi.string().required(),

      ELASTICSEARCH_INDEX_ASSISTANT: Joi.string().required(),

      MAPBOX_API_KEY: Joi.string().required(),
      MAPBOX_BASE_URL: Joi.string().required()
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
      host: envConfig.APP_MODE === "development" ? envConfig.DB_HOST : envConfig.P_DB_HOST,
      port: envConfig.APP_MODE === "development" ? envConfig.DB_PORT : envConfig.P_DB_PORT,
      username: envConfig.APP_MODE === "development" ? envConfig.DB_USERNAME : envConfig.P_DB_USERNAME,
      password: envConfig.APP_MODE === "development" ? envConfig.DB_PASSWORD : envConfig.P_DB_PASSWORD,
      name: envConfig.APP_MODE === "development" ? envConfig.DB_NAME : envConfig.P_DB_NAME,
    }
    this.mapbox = {
      apiKey: envConfig.MAPBOX_API_KEY,
      baseUrl: envConfig.MAPBOX_BASE_URL
    }
    this.redis = {
      host: envConfig.REDIS_HOST,
      port: envConfig.REDIS_PORT,
      password: envConfig.REDIS_PASSWORD,
      username: envConfig.REDIS_USERNAME
    }
    this.elasticSearch = {
      host: envConfig.APP_MODE === "development" ? envConfig.ELASTICSEARCH_NODE : envConfig.P_ELASTICSEARCH_NODE,
      username: envConfig.APP_MODE === "development" ? envConfig.ELASTICSEARCH_USERNAME : envConfig.P_ELASTICSEARCH_USERNAME,
      password: envConfig.APP_MODE === "development" ? envConfig.ELASTICSEARCH_PASSWORD : envConfig.P_ELASTICSEARCH_PASSWORD,
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
