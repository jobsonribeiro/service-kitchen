import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from 'src/api/controllers/health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHealthCheckStatus', () => {
    it('should return the status of the health check', () => {
      const result = controller.getHealthCheckStatus();

      expect(result).toEqual({ status: true });
    });

    it('should log the health check status', () => {
      const loggerSpy = jest.spyOn(controller['logger'], 'debug');

      controller.getHealthCheckStatus();

      expect(loggerSpy).toHaveBeenCalledWith('Health Check OK');
    });
  });
});
