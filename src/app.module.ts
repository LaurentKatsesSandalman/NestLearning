import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { FilterService } from './filter/filter.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FilterService],
})
export class AppModule {}
