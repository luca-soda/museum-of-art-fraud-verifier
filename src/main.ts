import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: '*'
  }));
  app.use('.well-known',express.static(join(process.cwd(), '.well-known')));
  await app.listen(4000);
}
bootstrap();
