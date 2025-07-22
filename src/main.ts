// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app/app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   // ✅ Set global prefix for all routes
//   app.setGlobalPrefix('/api/v1');

//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();

import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ✅ Set global prefix for all routes
  app.setGlobalPrefix('/api/v1');
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties not in the DTO
      forbidNonWhitelisted: true, // throws error for unknown properties
      transform: true, // transforms payloads to DTO instances
    }),
  );

  await app.listen(3000);
}
bootstrap();
