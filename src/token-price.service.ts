import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import Web3 from 'web3';

@Injectable()
export class TokenPriceService {
  private web3: Web3;

  constructor() {
    this.web3 = new Web3('https://polygon-rpc.com/');
  }

  async getTokenDecimals(): Promise<number> {
    try {
      const tokenAddress = '0x0000000000000000000000000000000000001010';
      const abi = [
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
          payable: false,
          stateMutability: 'pure',
          type: 'function',
        },
      ];

      const contract = new this.web3.eth.Contract(abi, tokenAddress);

      const decimals = await contract.methods.decimals().call();

      return parseInt(String(decimals), 10);
    } catch {
      throw new HttpException(
        'Error getting token decimals',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTokenPrice(): Promise<number> {
    try {
      const coingeckoApiUrl =
        'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=matic-network';
      const response = await axios.get(coingeckoApiUrl);

      const { usd } = response.data['matic-network'];

      return usd;
    } catch {
      throw new HttpException(
        'Error getting token price',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
