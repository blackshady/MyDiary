import {
  expect
} from 'chai';
import app from "../app";
import chai from 'chai';
import chaiHttp from 'chai-http';
import asyncCatchErrors from '../helpers/asyncErrorHandler';

chai.use(chaiHttp);

const signUpTestData = {
  userName: 'victor',
  email: 'victor09@gmail.com',
  surname: 'blackshady',
  firstName: 'chibuike',
  phoneNumber: '09825453',
  password: '12345',
}

const loginTestData = {
  email: 'victor09@gmail.com',
  password: '12345',
}

describe("/AuthController/: Handles the Sigin and logout of a user", () => {
  before('populate the database', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(signUpTestData);
    const user = res.body;
  })
  describe(' Login Routes', () => {
    it('should return a 200 status code when login is successful', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send(loginTestData);
      expect(res).to.have.status(200);
    });
    it('should return a 401 status code when user input wrong value', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: "victor001@gmail.com",
          password: "123"
        });
      expect(res).to.have.status(401);
    });
    it('should redirect the user to upon successful login', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send(loginTestData);
      expect(res.body).to.have.property('redirectUrl')
        .that.is.equal('https://mydiary.com/pages/index.html');
    });
    it('should return a token to the user upon successful login', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send(loginTestData);
      expect(res.body).to.have.property('token')
        .that.is.not.empty;
    });
  });
  describe('Signin Routes', () => {
    it('should return a 400 status code if user email already exist', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send(signUpTestData)
      expect(res).to.have.status(400);
    })
    it('should return a 201 status code when account is created successfully', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: 'ben',
          email: 'benk@gmail.com',
          surname: 'kencarson',
          firstName: 'carson',
          phoneNumber: '09825453',
          password: '12345',
        });
      expect(res).to.have.status(201);
    });
    it('should return the user token', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: 'ben',
          email: 'bent@gmail.com',
          surname: 'kencarson',
          firstName: 'carson',
          phoneNumber: '09825453',
          password: '12345',
        })
      expect(res.body).to.have.property('token').that.is.not.empty;
      expect(res.body).to.have.property('message').that.is.not.empty;
      expect(res.body).to.have.property('user').that.is.not.empty;
    });
    it('should return a status code 500, when there is a missing value', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/signup/')
        .send({
          userName: 'ben',
          email: 'ben@gmail.com',
          firstName: 'carson',
          phoneNumber: '09825453',
          password: '12345',
        })
      expect(res).to.have.status(500);

    })
  });
});