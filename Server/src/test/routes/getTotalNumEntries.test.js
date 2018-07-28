// import {
//   expect
// } from 'chai';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import moment from "moment";

// import app from '../../app';

// describe(' When "GET" request is made to fetch the total number of entries a user has', () => {
//   it('should return a status code of 200 when it exist', async () => {
//     const res = await chai.request(app)
//       .get('/api/v1/auth/1');
//     expect(res).to.have.status(200);
//     expect(res.body.status).to.equal('success');
//   })
//   it('should return the number of entries', async () => {
//     const res = await chai.request(app)
//       .get('/api/v1/auth/1');
//     expect(res.body).to.have.property('totalNumberOfEntries')
//       .that.is.not.empty;
//   })
//   it('should return a 404 when user des not have an entry yet', async () => {
//     const res = await chai.request(app)
//       .get('/api/v1/auth/0909');
//     expect(res).to.have.status(404)
//   })
//   it('should return a a message when user does not have an entry', async () => {
//     const res = await chai.request(app)
//       .get('/api/v1/auth/0909');
//     expect(res.body.status).to.have.equal('error')
//     expect(res.body).to.have.property('message')
//       .that.is.not.empty;
//   })
// })