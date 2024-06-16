import {Module } from '@nestjs/common';
import { HealthController } from 'src/api/controllers/health.controller';
import { OrderController } from 'src/api/controllers/order.controller';
import { OrderService } from 'src/domain/use-cases/order.service';
import { RequestService } from 'src/infrastructure/axios/request.service';
import { OrderRequestService } from 'src/infrastructure/axios/order.request.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { rabbitmqConfig } from './config/rabbitmq.config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [rabbitmqConfig.url],
          queue: rabbitmqConfig.queue,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [HealthController, OrderController],
  providers: [
    RequestService,
    OrderRequestService,
    OrderService,
    {
      provide: 'OrderRequestService',
      useClass: OrderRequestService,
    },
    {
      provide: 'OrderService',
      useClass: OrderService,
    },
  ],
})
export class AppModule {}
