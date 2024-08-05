import { OrderService } from "src/domain/use-cases/order.service";
import { OrderRequestServiceMock } from "./order.service.mock";
import { OrderRequestService } from "src/infrastructure/axios/order.request.service";

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRequestServiceMock: OrderRequestServiceMock;

  beforeEach(() => {
    orderRequestServiceMock = new OrderRequestServiceMock();

    orderService = new OrderService(orderRequestServiceMock as OrderRequestService);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('getOrdersPreparation', () => {
    it('should return orders', async () => {
      const result = await orderService.getOrdersPreparation();
      expect(result).toEqual({ statusCode: 200, message: [ { id: '1', name: 'Order 1' } ] });
    });
  });

  describe('setOrderFinish', () => {
    it('should return the finished order', async () => {
      const message = { id: '1', status: 'finished' };

      const result = await orderService.setOrderFinish(message);

      expect(result).toEqual({ statusCode: 200, message: { id: '1', name: 'Order 1' } });
    });
  });
});
