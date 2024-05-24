import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {dataSource} from './dbconf/db';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); 

  const columns: string[] = ['id', 'value'];
  const values: any[] = [1, 'some value'];
  console.log("Columns: ", columns.join(', ') +  "\nValues: " +  values.map(items => `'${items}'`).join(', '));   
}

bootstrap();

