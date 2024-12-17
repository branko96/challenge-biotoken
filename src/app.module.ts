import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenPriceController } from './token-price.controller';
import { TokenPriceService } from './token-price.service';

@Module({
  imports: [],
  controllers: [AppController, TokenPriceController],
  providers: [AppService, TokenPriceService],
})
export class AppModule {}
