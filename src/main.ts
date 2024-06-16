import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  await app.listen(process.env.SERVICE_PORT, () => {
    Logger.log(
      `Microservice is listening on port: ${process.env.SERVICE_PORT}`,
      'NestListener',
    );
  });
}

bootstrap();
