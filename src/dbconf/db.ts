import { DataSource, DataSourceOptions } from "typeorm";
import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const config  ={
    type: 'mysql',
    host: `${process.env.DB_HOST}`,
    port: parseInt(`${process.env.DB_PORT}`),
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize:true
};

export default registerAs('typeorm', () => config) 
export const dataSource = new DataSource(config as DataSourceOptions);

