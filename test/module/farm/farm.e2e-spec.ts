import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from '../../../src/app.module';
import * as request from 'supertest';
import { ProducerType } from '../../../src/modules/producer/producer.enum';

describe('FarmController (e2e)', () => {
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
        let farmId;
        let producerId;

        beforeAll(async () => {
            const producerData = {
                cnpj: '44385561000121',
                cpf: null,
                name: 'Producer Mock',
                type: ProducerType.PJ
            };

            let response = await request(app.getHttpServer())
                .post('/producer')
                .send(producerData)
                .expect(201);

            producerId = response.body.id;
        });

        it('should create a new farm', async () => {

            const farmData = {
                name: 'Farm Test',
                city: 'City Test',
                state: 'State Test',
                totalArea: 100,
                vegetationArea: 50,
                arableArea: 30,
                producer: {
                    id: producerId
                }
            };

            let response = await request(app.getHttpServer())
                .post('/farm')
                .send(farmData)
                .expect(201);

            farmId = response.body.id;

            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: 'Farm Test',
                    city: 'City Test',
                    state: 'State Test',
                    totalArea: 100,
                    vegetationArea: 50,
                    arableArea: 30,
                    producer: {
                        id: producerId
                    }
                }),
            );
        });

        it('should create a farm with totalArea < (vegetationArea + arableArea) and throw bad request.', async () => {

            let farmData = {
                name: 'Farm Test',
                city: 'City Test',
                state: 'State Test',
                totalArea: 50,
                vegetationArea: 30,
                arableArea: 30,
                producer: {
                    id: producerId
                }
            };

            let response = await request(app.getHttpServer())
                .post('/farm')
                .send(farmData)
                .expect(400);

            expect(response.body).toEqual(
                expect.objectContaining({
                    message: 'The total area must be greater than or equal to the sum of vegetation area plus arable area',
                    error: 'Bad Request',
                    statusCode: 400
                }),
            );
        });

        afterAll(async () => {
            if (farmId) {
                await request(app.getHttpServer())
                    .delete(`/producer/${producerId}`).expect(204);
            }
        });
    });

    fdescribe('PATCH', () => {
        let farmId: number;
        let producerId: number;

        beforeAll(async () => {

            const newProducerData = {
                cnpj: '44385561000121',
                cpf: null,
                name: 'New Producer Mock',
                type: ProducerType.PJ
            };

            let response = await request(app.getHttpServer())
                .post('/producer')
                .send(newProducerData)
                .expect(201);

            producerId = response.body.id;

            const farmData = {
                name: 'Test Farm',
                city: 'City Test',
                state: 'State Test',
                totalArea: 120,
                vegetationArea: 60,
                arableArea: 40,
                producer: {
                    id: producerId
                }
            };

            response = await request(app.getHttpServer())
                .post('/farm')
                .send(farmData)
                .expect(201);

            farmId = response.body.id;
        });

        it('should update a farm with new data', async () => {

            const farmData = {
                name: 'Updated Farm'
            };

            let response = await request(app.getHttpServer())
                .patch(`/farm/${farmId}`)
                .send(farmData)
                .expect(200);

            expect(response.body).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                    name: 'Updated Farm',
                    city: 'City Test',
                    state: 'State Test',
                    totalArea: 120,
                    vegetationArea: 60,
                    arableArea: 40
                }),
            );
        });

        afterAll(async () => {
            if (farmId) {
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

    describe('GET /producer/:id/details', () => {
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
