import type { DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';

export function getDatabaseOptions(): DataSourceOptions {
  const environment = process.env.NODE_ENV;

  if (environment !== 'development' && environment !== 'test') {
    throw new Error(`Unsupported database environment: ${environment}`);
  }

  return {
    type: 'sqlite',
    database: environment === 'test' ? 'test.sqlite' : 'db.sqlite',
    entities: [User, Report],
    migrations: ['migrations/*.js'],
    synchronize: environment === 'test',
  };
}
