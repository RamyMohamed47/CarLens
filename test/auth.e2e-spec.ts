import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Auth System (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'asdf@sadsd.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdad' })
      .expect(201)
      .then((res) => {
        const { id, email: responseEmail } = res.body;
        expect(id).toBeDefined();
        expect(responseEmail).toEqual(email);
      });
  });

  it('signup as new user and then get currently logged in user', async () => {
    const email = 'asdf@asdf.com';
    const agent = request.agent(app.getHttpServer());

    await agent
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201);

    const { body } = await agent.get('/auth/whoami').expect(200);

    expect(body.email).toEqual(email);
  });

  afterEach(async () => {
    await app.close();
  });
});
