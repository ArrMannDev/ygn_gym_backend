import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors();

  // Swagger/OpenAPI Configuration
  const config = new DocumentBuilder()
    .setTitle('Ygn Gym API')
    .setDescription(
      'The Ygn Gym API documentation - Manage users, memberships, classes, and bookings',
    )
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('memberships', 'Membership management endpoints')
    .addTag('classes', 'Class management endpoints')
    .addTag('bookings', 'Booking management endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Application is running on: http://localhost:3000`);
    console.log(
      `Swagger documentation available at: http://localhost:3000/api`,
    );
  });
}
bootstrap();
