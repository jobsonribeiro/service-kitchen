export class OrderRequestServiceMock {
    async getOrdersPreparation(status: string): Promise<any> {
      // Simulando a resposta do serviço
      return { statusCode: 200, message: [{ id: '1', name: 'Order 1' }] };
    }
  
    async setOrderFinish(id: string, status: string): Promise<any> {
      // Simulando a resposta do serviço
      return { statusCode: 200, message: { id: '1', name: 'Order 1' } };
    }
  }
  