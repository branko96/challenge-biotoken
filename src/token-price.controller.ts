import { Controller, Get } from '@nestjs/common';
import { TokenPriceService } from './token-price.service';

@Controller('token-price')
export class TokenPriceController {
  constructor(private readonly tokenPriceService: TokenPriceService) {}

  @Get()
  async getTokenPrice() {
    const decimals = await this.tokenPriceService.getTokenDecimals();
    const priceUSD = await this.tokenPriceService.getTokenPrice();

    return {
      token: 'POL',
      priceUSD,
      decimals,
      source: 'CoinGecko',
    };
  }
}
