import { parse } from 'dotenv';
import * as Joi from 'joi';
import { existsSync, readFileSync } from 'fs';
import { Logger } from '@nestjs/common';

interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly filePath = `.env.${process.env.NODE_ENV || 'development'}`;
  private logger = new Logger(`ConfigService`, true)

  constructor() {
    if (!existsSync(this.filePath)) {
      this.logger.error(`Config file ${this.filePath} not exist`)
      throw new Error();
    }
    const config = parse(readFileSync(this.filePath, 'utf-8'));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      APP_PORT: Joi.number().default(3000),
      NEO4J_URI: Joi.string(),
      NEO4J_USER: Joi.string(),
      NEO4J_PASSWORD: Joi.string()
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      this.logger.error(`Config validation error: ${error.message}`)
      throw new Error();
    }
    return validatedEnvConfig;
  }

  get environment(): string {
    return process.env.NODE_ENV || 'development'
  }

  get app_port(): number {
    return parseInt(this.envConfig.APP_PORT);
  }

  get neo4j_uri(): string {
    return this.envConfig.NEO4J_URI;
  }

  get neo4j_user(): string {
    return this.envConfig.NEO4J_USER;
  }

  get neo4j_password(): string {
    return this.envConfig.NEO4J_PASSWORD;
  }
}