// import {
//   expect
// } from 'chai';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import moment from "moment"

// import app from '../../app';

// describe(' When a "POST" request is made to create a diary entry', () => {
//   it('should return a 201 status code when the diary is created successful', async () => {
//     const res = await chai.request(app)
//       .post('/api/v1/entries')
//       .send({
//         "title": "my time an the roof",
//         "story": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda nobis aut quisquam aaspernatur eligendi aperiam odit quasi.",
//         "createdAt": moment().format('MMMM DD YYYY, h:mm:s A z').trim()
//       });
//     expect(res).to.have.status(201);
//   });
//   it('should return a status code of 400 if the fields are empty', async () => {
//     const res = await chai.request(app)
//       .post('/api/v1/entries')
//       .send({
//         "title": "",
//         "story": "",
//         "createdAt": moment().format('MMMM DD YYYY, h:mm:s A z').trim()
//       });
//     expect(res).to.have.status(400);
//   });
// });