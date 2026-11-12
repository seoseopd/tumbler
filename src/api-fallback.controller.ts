import { All, Controller, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller('api')
export class ApiFallbackController {
  @All()
  notFoundAtApiRoot(@Res() response: Response): void {
    response.status(HttpStatus.NOT_FOUND).json({
      error: '\uC694\uCCAD\uD55C \uC8FC\uC18C\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
    });
  }

  @All('{*path}')
  notFoundUnderApi(@Res() response: Response): void {
    response.status(HttpStatus.NOT_FOUND).json({
      error: '\uC694\uCCAD\uD55C \uC8FC\uC18C\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
    });
  }
}