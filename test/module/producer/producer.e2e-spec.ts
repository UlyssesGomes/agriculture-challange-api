import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../../src/app.module';
import * as request from 'supertest';
import { ProducerType } from '../../../src/modules/producer/producer.enum';
import { Producer } from '../../../src/modules/producer/producer.entity';

describe('ProducersController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    describe('POST', () => {
        let producerId;

        it('should create a new producer with CPF', async () => {

            const producerData = {
                cpf: '47769091039',
                name: 'John Doe',
                type: ProducerType.PF,
            };

            const response = await request(app.getHttpServer())
                .post('/producer')
                .send(producerData)
                .expect(201);

            producerId = response.body.id;
            console.log('id created ', producerId);

            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    cpf: '47769091039',
                    name: 'John Doe',
                    type: ProducerType.PF
                }),
            );
        });

        it('should create a new producer with CNPJ', async () => {
            const producerData = {
                cnpj: '16643066000130',
                name: 'Jane Doe',
                type: ProducerType.PJ,
            };

            const response = await request(app.getHttpServer())
                .post('/producer')
                .send(producerData)
                .expect(201);

            producerId = response.body.id;
            console.log('id created ', producerId);

            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    cnpj: '16643066000130',
                    name: 'Jane Doe',
                    type: ProducerType.PJ
                }),
            );
        });

        it('should return a bad request error with invalid CPF', async () => {
            const producerData = {
                cpf: '1234567890',
                name: 'John Doe',
                type: ProducerType.PF,
            };

            producerId = null;

            const response = await request(app.getHttpServer())
                .post('/producer')
                .send(producerData)
                .expect(400);
        });

        it('should return a bad request error with invalid CNPJ', async () => {
            const producerData = {
                cnpj: '01234567890123',
                name: 'Jane Doe',
                type: ProducerType.PJ,
            };

            const response = await request(app.getHttpServer())
                .post('/producer')
                .send(producerData)
                .expect(400);

            producerId = response.body.id;
            console.log('id created ', producerId);
        });

        afterEach(async () => {
            if (producerId) {
                await request(app.getHttpServer())
                    .delete(`/producer/${producerId}`).expect(204);
            }
        });
    });

    describe('PATCH', () => {
        let producerId: number;
        const deletedId = 1;

        beforeAll(async () => {
            const producerData = {
                cnpj: '16643066000130',
                name: 'Happy Farm LTDA',
                type: ProducerType.PJ
            };

            const response = await request(app.getHttpServer())
                .post('/producer')
                .send(producerData)

            producerId = response.body.id;
            console.log('producerId', producerId);


            await request(app.getHttpServer())
                .delete(`/producer/${deletedId}`)
                .send(producerData)
        });

        it('should return a not found error if producer does not exist', async () => {
            const updatedProducerData = {
                name: 'Happy Farm LTDA Updated',
            };

            const response = await request(app.getHttpServer())
                .patch(`/producer/${deletedId}`)
                .send(updatedProducerData)
                .expect(404);

            expect(response.body).toEqual(
                expect.objectContaining({
                    statusCode: 404,
                    message: `Producer with ID ${deletedId} not found`,
                    error: 'Not Found'
                }),
            );
        });

        it('should update a producer with new data', async () => {
            const updatedProducerData = {
                name: 'Happy Farm LTDA Updated',
            };

            const response = await request(app.getHttpServer())
                .patch(`/producer/${producerId}`)
                .send(updatedProducerData)
                .expect(200);

            expect(response.body).toEqual(
                expect.objectContaining({
                    id: producerId,
                    cnpj: '16643066000130',
                    name: 'Happy Farm LTDA Updated',
                    type: ProducerType.PJ
                }),
            );
        });

        afterAll(async () => {
            if (producerId) {
                await request(app.getHttpServer())
                    .delete(`/producer/${producerId}`)
            }
        });
    });

    describe('GET', () => {
        let producerId: number;

        beforeAll(async () => {
            const producerData = {
                cpf: '78396123004',
                name: 'Gomes Engineer',
                type: ProducerType.PF
            };

            const response = await request(app.getHttpServer())
                .post('/producer')
                .send(producerData)
                .expect(201);

            producerId = response.body.id;
        });

        it('should find a producer by ID', async () => {
            const response = await request(app.getHttpServer()).get(`/producer/${producerId}`).expect(200);
            expect(response.body).toEqual(expect.objectContaining({
                id: producerId,
                cpf: '78396123004',
                name: 'Gomes Engineer',
                type: ProducerType.PF
            }));
        });

        it('should return a not found error if producer does not exist', async () => {
            const response = await request(app.getHttpServer())
                .get('/producer/9999999')
                .expect(404);

            expect(response.body).toHaveProperty('message');
        });

        afterAll(async () => {
            if (producerId) {
                await request(app.getHttpServer())
                    .delete(`/producer/${producerId}`)
            }
        });
    });

    xdescribe('GET /producer/:id/details', () => {
        let producerId;

        beforeAll(async () => {
            const producerData = {
                cnpj: '41625892000101',
                name: 'Mega Farm LTDA',
                type: ProducerType.PJ,
                farms: [
                    {
                        name: 'Farm 1',
                        city: 'City 1',
                        state: 'State 1',
                        totalArea: 100,
                        vegetationArea: 50,
                        arableArea: 30,
                        harvests: [
                            {
                                year: 2022,
                                plantedCrops: [{
                                    crop: 'Soybean',
                                }]
                            },
                            {
                                year: 2024,
                                plantedCrops: [{
                                    crop: 'Wheat',
                                },]
                            }
                        ]
                    },
                    {
                        name: 'Farm 2',
                        city: 'City 2',
                        state: 'State 2',
                        totalArea: 200,
                        vegetationArea: 75,
                        arableArea: 40,
                        harvests: [
                            {
                                year: 2023,
                                plantedCrops: [
                                    {
                                        crop: 'Corn',
                                    },
                                ]
                            },
                        ]
                    },
                ]
            };

            const response = await request(app.getHttpServer())
                .post('/producer')
                .send(producerData)
                .expect(201);

            producerId = response.body.id;
        });

        it('should find a producer by ID with details', async () => {
            const response = await request(app.getHttpServer()).get(`/producer/${producerId}/details`).expect(200);            
        });

        it('should return a not found error if producer does not exist', async () => {
            const response = await request(app.getHttpServer())
                .get('/producer/12345/details')
                .expect(404);

            expect(response.body).toHaveProperty('message');
        });

        afterAll(async () => {
            await request(app.getHttpServer())
                .delete(`/producer/${producerId}`)
                .expect(204);
        });
    });

    describe('DELETE', () => {
        it('should delete a producer by ID', async () => {

            const producerData = {
                cpf: '07893233036',
                name: 'John Doe',
                type: ProducerType.PF
            };

            const response = await request(app.getHttpServer())
                .post('/producer')
                .send(producerData)

            const producerId = response.body.id;

            await request(app.getHttpServer()).delete(`/producer/${producerId}`).expect(204);
        });

        it('should return a not found error if producer does not exist', async () => {
            await request(app.getHttpServer())
                .delete('/producer/9999999')
                .expect(404);
        });
    });

});
