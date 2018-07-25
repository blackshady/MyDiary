import {
  expect
} from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from "moment";

import app from '../../app';

describe('When a "Post" request is made to login the application', () => {
  it('should return a 200 status code when login is successful', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: "Victor@gmail.com",
        password: "12345"
      });
    expect(res).to.have.status(200);
  })
  it('should return a 401 status code when user input wrong value', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: "Victor@gmail.com",
        password: "1235"
      });
    expect(res).to.have.status(401);
  })
  it('should redirect the user to upon successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: "Victor@gmail.com",
        password: "12345"
      });
    expect(res.body).to.have.property('redirect uri')
      .that.is.equal('https://mydiary.com/pages/index.html');
  })
  it('should return the user credentials to upon successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: "Victor@gmail.com",
        password: "12345"
      });
    expect(res.body).to.have.property('isUser')
      .that.has.property('firstName')
      .that.is.equal('Victor');
  })
});