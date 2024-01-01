import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use('/files', express.static('files'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
