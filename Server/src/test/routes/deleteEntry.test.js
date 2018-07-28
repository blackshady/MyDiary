// import {
//   expect
// } from 'chai';
// import chai from 'chai';
// import chaiHttp from 'chai-http';

// import app from '../../app';

// describe('When a "Delete request is made to delete a specific diary entry"', () => {
//   it('should return a 200 status code upon successful delete', async () => {
//     const res = await chai.request(app)
//       .delete('/api/v1/entries/3');
//     expect(res).to.have.status(200);
//   });
//   it('should return a 404 status code when the entries ID cannot be found', async () => {
//     const res = await chai.request(app)
//       .delete('/api/v1/entries/030');
//     expect(res).to.have.status(404);
//   });
//   it('should have an error status', async () => {
//     const res = await chai.request(app)
//       .delete('/api/v1/entries/030');
//     expect(res.body).to.have.property('status')
//       .that.is.equal('error');
//   });
//   it('should return a message "Entry not Found" when the entry cannot be found', async () => {
//     const res = await chai.request(app)
//       .delete('/api/v1/entries/030');
//     expect(res.body).to.have.property('message')
//       .that.is.equal('Entry not Found');
//   });
// });