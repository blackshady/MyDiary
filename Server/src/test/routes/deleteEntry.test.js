import { expect } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

describe(' "DELETE/" specific entry', () => {
it('should return a 200 status code', async()=>{
  const res = await chai.request(app)
  .delete('/api/v1/entries/3');
  expect(res).to.have.status(200);
});
it('should return a 404 status code', async()=>{
  const res = await chai.request(app)
  .delete('/api/v1/entries/030');
  expect(res).to.have.status(404);
});
it('should have an error status', async()=>{
  const res = await chai.request(app)
  .delete('/api/v1/entries/030');
  expect(res.body).to.have.property('status')
  .that.is.equal('error');
});
it('should return Entry not Found', async()=>{
  const res = await chai.request(app)
  .delete('/api/v1/entries/030');
  expect(res.body).to.have.property('message')
  .that.is.equal('Entry not Found');
});
});