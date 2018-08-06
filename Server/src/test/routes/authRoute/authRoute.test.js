import chai, {
  expect
} from 'chai'
import app from '../../../app';
import chaiHttp from 'chai-http';
import {
  realUser,
  badEmail,
  noPass,
  noUserName,
  wrongLength,
  emptyEmail
} from './testData';

import TestMigration from './index';
import logger from '../../../helpers/logger';

chai.use(chaiHttp);


describe('POST/ api/v1/auth   Handles the Sign and login of a user', () => {
  before('Create database table', async () => {
    await TestMigration.createTestTable().catch(err => logger.info(err.message));;
  })

  describe('Signup Route', () => {
    it('should return a 201 status code when account is created successfully', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(realUser);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('token')
        .that.is.not.empty;
      expect('Content-Type', /json/);
    });

    it('should return a message when a bad email is passed', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(badEmail);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message')
        .that.is.equal('It seems your email is not valid, or is incorrect');
    })
    it('should return a message and throw an error when there is no password', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(noPass);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status').that.is.equal('error');
      expect(res.body).to.have.property('message')
        .that.is.equal('password must not be empty');
    })
    it('should return a message and throw an error when there is no UserName passed', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(noUserName);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status').that.is.equal('error');
      expect(res.body).to.have.property('message')
        .that.is.equal('username must not be empty');
    })
    it('should return a message and throw an error when the length to character is not greater than five', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(wrongLength);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status').that.is.equal('error');
      expect(res.body).to.have.property('message')
        .that.is.equal('Fields length must not be less than five characters');
    })
    it('should return a message and throw an error when an empty string is passed to the email', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(emptyEmail);
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('status').that.is.equal('error');
      expect(res.body).to.have.property('message')
        .that.is.equal('email must not be empty');
    })
    it('should return a 409 status code when account already exist', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(realUser);
      expect(res).to.have.status(409);
    })
  });
  describe('Login Route', () => {
    it('should return a 200 status code and a token when account is successfully login', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send(realUser);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token')
        .that.is.not.empty;
      expect('Content-Type', /json/);
    });
    it('should return a 401 status code when credentials in invalid', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send(noUserName);
      expect(res).to.have.status(401);
      expect(res.body).to.have.property('status').that.is.equal('error');
      expect(res.body).to.have.property('message')
        .that.is.equal('Invalid Users Credentials')
    });
  });
  after('Drop users table', async () => {
    await TestMigration.dropTestTable().catch(err => logger.info(err.message));
  })

})