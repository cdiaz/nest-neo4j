import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule, 
    DatabaseModule,
    MovieModule
  ],
})
export class AppModule {}
