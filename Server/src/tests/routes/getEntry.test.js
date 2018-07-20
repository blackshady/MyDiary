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
});
