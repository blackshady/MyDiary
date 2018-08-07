import chai, {
  expect
} from 'chai'
import app from '../../../app';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
let userToken;

describe('EntriesController', () => {
  before('register a user and get their token', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'perterpan@gmail.com',
        password: '234bhytr',
        username: 'perterPPan'
      });
    userToken = res.body.token;
  });
  describe('POST/ api/v1/entries   createEntry', () => {
    it('should a 201 status code when an entry is created successfully', async () => {
      const res = await chai.request(app)
        .post('/api/v1/entries')
        .set('Authorization', `Bearer: ${userToken}`)
        .send({
          title: 'Sitting in the blistering cold',
          story: 'All i ever wanted was to achieve my dreams and now it seem  it has been dashed, that is my fear'
        });
      expect(res).to.have.status(201)
      expect(res.body).to.have.property('entry')
        .that.is.not.empty;
    });
  });
  describe('GET/ api/v1/entries   getAllEntries', () => {
    it('should return a 200 status code and the user entries', async () => {
      const res = await chai.request(app)
        .get('/api/v1/entries')
        .set('Authorization', `Bearer: ${userToken}`)
      expect(res).to.have.status(200)
      expect(res.body).to.have.property('entries')
    })
  })
  describe('GET/ api/v1/entries/:entryId   get specific user entry', () => {
    it('should return a 200 status code and a diary entry', async () => {
      const res = await chai.request(app)
        .get('/api/v1/entries/1')
        .set('Authorization', `Bearer: ${userToken}`)
      expect(res).to.have.status(200)
      expect(res.body.entry).to.have.property('title')
    })
    it('should return a 404 status code when the dairy entry not found', async () => {
      const res = await chai.request(app)
        .get('/api/v1/entries/22')
        .set('Authorization', `Bearer: ${userToken}`)
      expect(res).to.have.status(404)
      expect(res.body).to.have.property('message')
        .that.is.equal('Diary Entry can not be found');
    })
  })

  describe('UPDATE/ api/v1/entries/:entryId  update user entry', () => {
    beforeEach('add dary entry to the database', async () => {
      await chai.request(app)
        .post('/api/v1/entries')
        .set('Authorization', `Bearer: ${userToken}`)
        .send({
          title: 'Come and minify ',
          story: ' The fire is new, All i ever wanted was to achieve my dreams and now it seem  it has been dashed, that is my fear'
        });
    })
    it('should update the entry and return a 200 status code', async () => {
      const res = await chai.request(app)
        .put('/api/v1/entries/2')
        .set('Authorization', `Bearer: ${userToken}`)
        .send({
          title: 'check it out if it is gonna work'
        })
      expect(res).to.have.status(200);
    })

    it('should return a 404 status code and a message when  the entry is not found or a wrong entryId is passed', async () => {
      const res = await chai.request(app)
        .put('/api/v1/entries/2090')
        .set('Authorization', `Bearer: ${userToken}`)
        .send({
          title: 'check it out if it is gonna work'
        })
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message')
        .that.is.equal('Diary can not be found or does not exist')
    })
  });
  describe('DELETE/ ap1/v1/entries/:entryId  delete a diary entry', () => {
    it('should delete a diary entry and return a 200 status code', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/entries/2')
        .set('Authorization', `Bearer: ${userToken}`)
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('message')
        .that.is.equal('Diary entry deleted successfully')
    })

    it('should return a 404 status code when the wrong entryId is passed or entry does not exist', async () => {
      const res = await chai.request(app)
        .delete('/api/v1/entries/2018')
        .set('Authorization', `Bearer: ${userToken}`)
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message')
        .that.is.equal('Diary Entry can not be found')
    })
  })
});