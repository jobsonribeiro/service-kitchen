import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from 'src/api/controllers/order.controller';
import { OrderService } from 'src/domain/use-cases/order.service';
import { OrderResponse } from 'src/infrastructure/interfaces/order/order.response.interface';
import { ResponseBody } from 'src/infrastructure/interfaces/response.body.interface';

describe('OrderController', () => {
  let controller: OrderController;
  let mockOrderService: jest.Mocked<OrderService>;
  const mockOrderData = {
    data: {
        Attributes: {id: 1, status: "teste"},
        ResponseMetadata: {
            RequestId: "12345",
            HTTPStatusCode: 200,
            HTTPHeaders: {
              "content-type": "application/json",
              "date": "Sat, 18 May 2024 12:34:56 GMT",
              "content-length": "",
              "x-amz-crc32": "",
              "x-amzn-requestid": "",
              connection: "",
              server: ""
            },
            RetryAttempts: 1
        }
    },
  }

  beforeEach(async () => {
    mockOrderService = {
      getOrdersPreparation: jest.fn(),
      setOrderFinish: jest.fn(),
    } as unknown as jest.Mocked<OrderService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('orderPreparation', () => {
    it('should call getOrdersPreparation method of OrderService and return orders', async () => {
        const orders: ResponseBody<OrderResponse> = {
            data: mockOrderData.data,
            errors: [],
            message: "",
            statusCode: 200
          };
      mockOrderService.getOrdersPreparation.mockResolvedValue(orders);

      const result = await controller.orderPreparation();

      expect(result).toEqual(orders);
      expect(mockOrderService.getOrdersPreparation).toHaveBeenCalled();
    });
  });

  describe('orderFinish', () => {
    it('should call setOrderFinish method of OrderService with the provided message and return orders', async () => {
      // Arrange
      const message = { id: '1', status: 'finished' };
      const orders: ResponseBody<OrderResponse> = {
        data: mockOrderData.data,
        errors: [],
        message: "",
        statusCode: 200
      };
      mockOrderService.setOrderFinish.mockResolvedValue(orders);

      const result = await controller.orderFinish(message);

      expect(result).toEqual(orders);
      expect(mockOrderService.setOrderFinish).toHaveBeenCalledWith(message);
    });
  });
});
