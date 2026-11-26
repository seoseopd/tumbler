import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const products = [
  { product_id: 'P-SILVER', name: '\uD140\uBE14\uB7EC \uC2E4\uBC84', color: '\uC740\uC0C9', label: '\uC740\uC0C9 \uD140\uBE14\uB7EC' },
  { product_id: 'P-WHITE', name: '\uD140\uBE14\uB7EC \uD654\uC774\uD2B8', color: '\uD770\uC0C9', label: '\uD770\uC0C9 \uD140\uBE14\uB7EC' },
  { product_id: 'P-BLACK', name: '\uD140\uBE14\uB7EC \uBE14\uB799', color: '\uAC80\uC815', label: '\uAC80\uC815 \uD140\uBE14\uB7EC' },
];

@Controller('api')
export class CatalogController {
  @Get('products')
  getProducts(): typeof products {
    return products;
  }

  @Get('standards/:revision')
  getStandard(@Param('revision') revision: string): unknown {
    if (revision !== 'Rev.A' && revision !== 'Rev.B') {
      throw new NotFoundException('\uAC80\uC0AC\uAE30\uC900\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.');
    }

    const filePath = path.join(process.cwd(), 'standards', `${revision}.json`);
    return JSON.parse(readFileSync(filePath, 'utf8')) as unknown;
  }
}