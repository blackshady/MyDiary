import {
  expect
} from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import moment from "moment";

import app from '../../app';

describe(' When a "PUT" request is made to modify the content of an entry ', () => {
  it('should return a status code of 200 when it is succesful', async () => {
    const res = await chai.request(app)
      .put('/api/v1/entries/2')
      .send({
        'title': "the joint of join"
      });
    expect(res).to.have.status(200);
  })
  it('should return a status code of 404 when the user ID cannot be found', async () => {
    const res = await chai.request(app)
      .put('/api/v1/entries/00')
      .send({
        'title': "code"
      })
    expect(res).to.have.status(404);
  })
  it('should return a message upon success', async () => {
    const res = await chai.request(app)
      .put('/api/v1/entries/2')
      .send({
        story: "the joint of join"
      })
    expect(res.body).to.have.property('message')
      .that.is.equal('Entry updated successfully');
  })
  it('should return a message upon failed action', async () => {
    const res = await chai.request(app)
      .put('/api/v1/entries/0')
      .send({
        'title': "the joint of join"
      })
    expect(res.body).to.have.property('message')
      .that.is.equal('Entry not Found');
  })
  it('should return a message upon failed action', async () => {
    const res = await chai.request(app)
      .put('/api/v1/entries/0')
      .send({
        'story': "the joint of join"
      })
    expect(res.body).to.have.property('message')
      .that.is.equal('Entry not Found');
  })
  it('should have date of modification', async () => {
    const res = await chai.request(app)
      .put('/api/v1/entries/2')
      .send({
        'lastModified': moment().format('MMMM DD YYYY, h:mm:s A z').trim()
      })
    expect(res.body.entriesDb).to.have.property('lastModified')
      .that.is.not.empty;
  })
});