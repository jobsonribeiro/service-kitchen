import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { OrderRequestService } from 'src/infrastructure/axios/order.request.service';
import { RequestService } from 'src/infrastructure/axios/request.service';

const requestServiceMock = {
  makeRequest: jest.fn(),
};

describe('OrderRequestService', () => {
  let service: OrderRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderRequestService,
        { provide: RequestService, useValue: requestServiceMock },
      ],
    }).compile();

    service = module.get<OrderRequestService>(OrderRequestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call requestService.makeRequest with correct parameters for ChangeOrderForPreparation', async () => {
    const orderId = '123';
    const status = 'pending';
    const expectedResponse = {
      statusCode: HttpStatus.OK,
      data: { message: 'success' },
    };
    requestServiceMock.makeRequest.mockResolvedValue(expectedResponse);

    const result = await service.ChangeOrderForPreparation(orderId, status);

    expect(requestServiceMock.makeRequest).toHaveBeenCalledTimes(1)
    expect(result.data).toEqual(expectedResponse.data);
  });
});
