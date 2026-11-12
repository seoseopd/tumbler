import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    if (request.path !== '/api' && !request.path.startsWith('/api/')) {
      response.status(500).end();
      return;
    }

    let status = 500;
    let message = '\uC11C\uBC84\uC5D0\uC11C \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4.';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const detail = exception.getResponse();
      if (typeof detail === 'string') {
        message = detail;
      } else if (typeof detail === 'object' && detail !== null) {
        const body = detail as { error?: unknown; message?: unknown };
        const text = typeof body.message === 'string' ? body.message : body.error;
        if (typeof text === 'string') message = text;
        else if (Array.isArray(text)) message = text.join(' ');
      }
    }

    response.status(status).json({ error: message });
  }
}