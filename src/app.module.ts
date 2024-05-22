import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSource } from './dbconf/db';
import typeorm from './dbconf/db';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
  constructor(dataSource:DataSource){}
 
  async runMigration(){
    try{
      await dataSource.initialize();
      
    }catch(error){
      console.log("Error initializing database, because exception is happen:\n Context:\n", error); 
    }
  }
}
