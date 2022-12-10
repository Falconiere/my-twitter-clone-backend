/* eslint-disable @typescript-eslint/no-empty-function */
import * as request from 'supertest';
import { INestApplication, LoggerService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';

import { TypeOrmModule } from 'modules/database/typeorm.module';

import { User } from './users.entity';
import { UsersModule } from './users.module';

const newUser: User = {
  firstName: 'falconiere',
  lastName: 'barbosa',
  phone: '7126372167',
  username: 'falconiere',
};

export class EmptyLogger implements LoggerService {
  log(message: string): any {}
  error(message: string, trace: string): any {}
  warn(message: string): any {}
  debug(message: string): any {}
  verbose(message: string): any {}
}

describe('UsersController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, UsersModule, TypeOrmModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useLogger(new EmptyLogger());
    app.setGlobalPrefix('api/v1');
    await app.listen(3001);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('create', () => {
    it('should return the created user', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(newUser)
        .expect(201);
      const body = response.body as User;
      expect(body.firstName).toEqual(newUser.firstName);
      expect(body.lastName).toEqual(newUser.lastName);
      expect(body.username).toEqual(newUser.username);
      expect(body.isActive).toEqual(true);
      expect(body.id).toEqual(expect.any(Number));
    });

    it('Should return error for a used username', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(newUser)
        .expect(201);
      await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(newUser)
        .expect(500);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(newUser)
        .expect(201);

      await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({ ...newUser, username: 'falconiere2' })
        .expect(201);

      const response = await request(app.getHttpServer())
        .get('/api/v1/users')
        .expect(200);

      const body = response.body as User[];
      expect(body.length).toEqual(2);
      expect(body[1].firstName).toEqual(newUser.firstName);
    });
  });

  describe('findById', () => {
    it('should return an user by id', async () => {
      let response = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(newUser)
        .expect(201);
      let body = response.body as User;

      response = await request(app.getHttpServer())
        .get(`/api/v1/users/${body.id}`)
        .send(newUser)
        .expect(200);
      body = response.body as User;
      expect(body.firstName).toEqual(newUser.firstName);
      expect(body.lastName).toEqual(newUser.lastName);
      expect(body.username).toEqual(newUser.username);
      expect(body.isActive).toEqual(true);
      expect(body.id).toEqual(expect.any(Number));
    });
  });

  describe('update', () => {
    it('should return the updated user', async () => {
      let response = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(newUser)
        .expect(201);
      let body = response.body as User;
      const userID = body.id;
      response = await request(app.getHttpServer())
        .put(`/api/v1/users/${userID}`)
        .send({ ...body, firstName: 'Paulo' })
        .expect(200);
      body = response.body as User;
      expect(body.firstName).toEqual('Paulo');
      expect(body.id).toEqual(userID);
    });
  });

  describe('delete', () => {
    it('should return empty for a deleted use', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(newUser)
        .expect(201);
      const body = response.body as User;
      const userID = body.id;
      return await request(app.getHttpServer())
        .delete(`/api/v1/users/${userID}`)
        .expect(200)
        .expect({});
    });
  });
  describe('isUserNameAvailable', () => {
    it('should return true for a non used user name', async () => {
      return await request(app.getHttpServer())
        .get('/api/v1/users/username/falconiere2')
        .expect(200)
        .expect((res) =>
          expect(res.body).toEqual({
            isAvailable: true,
            message: 'The username "falconiere2" is available',
          }),
        );
    });

    it('should return false for a used user name', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/users')
        .send(newUser)
        .expect(201);
      return await request(app.getHttpServer())
        .get(`/api/v1/users/username/${newUser.username}`)
        .expect(200)
        .expect((res) =>
          expect(res.body).toEqual({
            isAvailable: false,
            message: `The username "${newUser.username}" is not available`,
          }),
        );
    });
  });
});
