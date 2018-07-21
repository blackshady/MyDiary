import { expect } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);

describe(' "GET/" all entries  ', () => {
  it('should return a 200 status code', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries');
    expect(res).to.have.status(200);
  });
  it('it should return a json object', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries');
    expect(res.body).to.be.a('object');
  });
  it('should return all entries in the database', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries');
    expect(res.body).to.have.property('entriesDb');
  });
  it('should have a property of title', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries');
    expect(res.body.entriesDb[0]).to.have.property('title');
  });
  it('should not have an empty title', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries');
    expect(res.body.entriesDb[0]).to.have.property('title')
      .that.is.not.empty;
  });
  it('should have a property of story', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries');
    expect(res.body.entriesDb[0]).to.have.property('title');
  });
  it('should not have an empty story content', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries');
    expect(res.body.entriesDb[0]).to.have.property('story')
      .that.is.not.empty;
  });
  it('should have a property of date', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries');
    expect(res.body.entriesDb[0]).to.have.property('createdAt');
  });
  it('should not have an empty date', async () => {
    const res = await chai.request(app)
      .get('/api/v1/entries');
    expect(res.body.entriesDb[0]).to.have.property('createdAt').that.is.not.empty;
  });
 
});
