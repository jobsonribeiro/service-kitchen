export class OrderRequestServiceMock {
    async ChangeOrderForPreparation(id: string, status: string): Promise<any> {
      return { statusCode: 200, message: { id, status } };
    }
  }
  