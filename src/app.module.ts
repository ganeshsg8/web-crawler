import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerModule } from './crawler/crawler.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config/Configuration';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Configuration]
    }),
    CrawlerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
