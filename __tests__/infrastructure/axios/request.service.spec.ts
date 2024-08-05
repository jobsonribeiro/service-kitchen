import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { RequestService } from 'src/infrastructure/axios/request.service';
import { HttpMethod } from 'src/infrastructure/enums/http.method.enum';

describe('RequestService', () => {
  let requestService: RequestService;
  let httpServiceMock: HttpService;

  beforeEach(() => {
    httpServiceMock = {
      request: jest.fn(),
    } as any;
    requestService = new RequestService(httpServiceMock);
  });

  it('should be defined', () => {
    expect(requestService).toBeDefined();
  });

  describe('makeRequest', () => {
    it('should make a request with the provided parameters', async () => {
      // Arrange
      const microserviceUrl = 'http://example.com';
      const method = 'GET';
      const endpoint = 'test';
      const data = { key: 'value' };
      const expectedResponse = {
        status: HttpStatus.OK,
        statusText: 'OK',
        headers: {}, // Objeto vazio para headers
        config: {}, // Objeto vazio para config
        data: {
          data: { message: 'success' },
        },
      };

      // Mockando a implementação do método request
      jest.spyOn(httpServiceMock, 'request').mockImplementation(() => of(expectedResponse as any));

      // Act
      const result = await requestService.makeRequest(
        microserviceUrl,
        HttpMethod.GET,
        endpoint,
        data
      );

      // Assert
      expect(httpServiceMock.request).toHaveBeenCalledWith({
        method,
        url: `${microserviceUrl}/${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          language: 'pt',
        },
      });
      expect(result).toEqual({
        statusCode: HttpStatus.OK,
        data: expectedResponse.data.data,
        message: undefined,
        errors: undefined,
      });
      
    });

    it('should handle errors properly', async () => {
      // Arrange
      const microserviceUrl = 'http://example.com';
      const method = 'GET';
      const endpoint = 'test';
      const data = { key: 'value' };
      const expectedErrorResponse = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        statusText: 'Internal Server Error',
        headers: {}, // Objeto vazio para headers
        config: {}, // Objeto vazio para config
        data: { message: 'Internal server error' },
      };

      // Mockando a implementação do método request
      jest.spyOn(httpServiceMock, 'request').mockImplementation(() => throwError({ response: expectedErrorResponse as any }));

      // Act
      const result = await requestService.makeRequest(
        microserviceUrl,
        HttpMethod.GET,
        endpoint,
        data
      );

      // Assert
      expect(httpServiceMock.request).toHaveBeenCalledWith({
        method,
        url: `${microserviceUrl}/${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          language: 'pt',
        },
      });
      expect(result).toEqual({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        data: {},
        message: 'Internal server error',
        errors: [],
      });
    });
  });
});
