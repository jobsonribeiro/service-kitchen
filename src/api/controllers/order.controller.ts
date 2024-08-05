import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { OrderService } from 'src/domain/use-cases/order.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService,
        @Inject('RABBITMQ_SERVICE') private client: ClientProxy,
    ) { }

    @Get('preparation')
    async orderPreparation() {
        const order = await this.orderService.getOrdersPreparation();
        return order;
    }

    @Post('finish')
    async orderFinish(@Body() message: any) {

        this.client.emit('order_finish', { 'orderId': message.orderId });
        const order = "Pedido finalizado";

        return order;
    }
}
