import { NestFactory } from '@nestjs/core';
import express, { type NextFunction, type Request, type Response } from 'express';
import session from 'express-session';
import path from 'node:path';
import { ApiExceptionFilter } from './api-exception.filter';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'tumbler-factory-training-session',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use((_request: Request, response: Response, next: NextFunction) => {
    response.setHeader('Cache-Control', 'no-store');
    next();
  });

  app.use((request: Request, response: Response, next: NextFunction) => {
    const isApi = request.path === '/api' || request.path.startsWith('/api/');
    const isAuthEndpoint =
      (request.method === 'GET' && request.path === '/api/session') ||
      (request.method === 'POST' && request.path === '/api/login') ||
      (request.method === 'POST' && request.path === '/api/logout');

    if (!isApi || isAuthEndpoint || request.session.user) {
      next();
      return;
    }

    response.status(401).json({ error: '\uB85C\uADF8\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.' });
  });

  const publicDirectory = path.join(process.cwd(), 'public');
  app.use(express.static(publicDirectory));
  app.use((request: Request, response: Response, next: NextFunction) => {
    if (request.path.startsWith('/api')) {
      next();
      return;
    }

    response.sendFile(path.join(publicDirectory, 'index.html'), (error?: Error) => {
      if (error) next(error);
    });
  });

  app.useGlobalFilters(new ApiExceptionFilter());
  const port = Number(process.env.PORT ?? 4185);
  await app.listen(port, '127.0.0.1');
  console.log(`\uD488\uC9C8 \uB300\uC2DC\uBCF4\uB4DC \uC11C\uBC84 \uC2E4\uD589 \uC911: http://127.0.0.1:${port}`);
}

void bootstrap();
