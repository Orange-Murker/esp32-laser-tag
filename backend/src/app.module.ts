import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GamesModule } from './games/games.module';
import { MatchesModule } from './matches/matches.module';
import { GunsModule } from './guns/guns.module';
import { UpdatesModule } from './updates/updates.module';
import { PlaysModule } from './plays/plays.module';
import { HitsModule } from './hits/hits.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: parseInt(configService.get<string>('DB_PORT', '5432')),
        username: configService.get<string>('DB_USER', 'lzrtag'),
        password: configService.get<string>('DB_PASS', 'lzrtag_$3cr3t'),
        database: configService.get<string>('DB_NAME', 'lzrtag'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // For real production synchronisation isn't great, but for us, it doesn't really matter
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    UsersModule,
    GamesModule,
    MatchesModule,
    GunsModule,
    UpdatesModule,
    PlaysModule,
    HitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
