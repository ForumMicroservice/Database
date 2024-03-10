import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Topic } from './entities/topics.entity';
import { Subject } from './entities/subject.entity';
import { Comment } from './entities/comment.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: false}), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        entities: [User,Role,Topic,Subject,Comment],
        autoLoadEntities: true,
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [ConfigService]
})
export class AppModule {}
