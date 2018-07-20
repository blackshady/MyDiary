import { expect } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);

describe(' "GET/" specific entry', () => {
  it('should return a 200 status code', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/2');
    expect(res).to.have.status(200);
  });
  it('should return an object', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/2');
    expect(res.body).to.be.an('object');
  });
  it('should return a success status', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/2');
    expect(res.body.status).to.be.equal('success');
  });
  it('should return the diary', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/2');
    expect(res.body).to.have.property('diary');
  });
  it('check if diary is not empty', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/2');
    expect(res.body.diary).to.not.be.empty;
  });
  it('check if the diary has a title property that is not empty', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/2');
    expect(res.body.diary).to.have.property('title')
      .that.is.not.empty;
  });
  it('check if the diary has a story property that is not empty', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/2');
    expect(res.body.diary).to.have.property('story')
      .that.is.not.empty;
  });
  it(' check if the diary has a date property and that is no empty', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/2');
    expect(res.body.diary).to.have.property('createdAt')
    .that.is.not.empty;
  });
  it('check if the diary contain the user id', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/2');
    expect(res.body.diary).to.have.property('userId')
      .that.is.not.empty;
  });
  it('should return a status code of 404 ', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/010');
    expect(res).to.have.status(404);
  });
  it('should return an error ', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/010');
    expect(res.body.status).to.be.equal('error');
  });
  it('should return a message diary not found ', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries/010');
    expect(res.body).to.have.property('message')
    .that.is.equal('Diary not found');
  });
});
