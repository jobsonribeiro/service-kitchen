import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('OrderController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/order/preparation (GET)', () => {
        return request(app.getHttpServer())
            .get('/order/preparation')
            .expect(200)
            .expect((response) => {
                expect(response.body).toHaveProperty('data');
                expect(Array.isArray(response.body.data)).toBe(true);
                expect(response.body.data.length).toBeGreaterThan(0);
                response.body.data.forEach(order => {
                    expect(order).toHaveProperty('_id');
                    expect(order).toHaveProperty('status');
                });
            });
    });

    it('/order/finish (POST)', () => {
        return request(app.getHttpServer())
            .post('/order/finish')
            .send({ id: "2", status: "3" })
            .expect(201)
            .expect((response) => {
                expect(response.body).toHaveProperty('data');
                expect(response.body.data).toHaveProperty('Attributes');
                expect(response.body.data.Attributes).toHaveProperty('status');
                expect(response.body.data.Attributes.status).toBe('3');
            });
    });

    afterAll(async () => {
        await app.close();
    });
});
