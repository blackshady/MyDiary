import {
  chai
} from 'chai';
import app from "../app";


describe("/AuthController/: Handles the Sigin and logout of a user", () => {
  describe(' "Login()" Methods', () => {
    it('should return a 200 status code when login is successful', async () => {
      const res = await chai.request(app)
        .post('/ap1/v1/auth/login')
        .send({
          email: "Victor@gmail.com",
          password: "12345"
        });
      expect(res).to.have.status(200);
    });
    it('should return a 401 status code when user input wrong value', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: "Victor@gmail.com",
          password: "1235"
        });
      expect(res).to.have.status(401);
    });
    it('should redirect the user to upon successful login', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: "Victor@gmail.com",
          password: "12345"
        });
      expect(res.body).to.have.property('redirectUrl')
        .that.is.equal('https://mydiary.com/pages/index.html');
    });
    it('should return a token to the user upon successful login', async () => {
      const res = await chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: "Victor@gmail.com",
          password: "12345"
        });
      expect(res.body).to.have.property('token')
        .that.is.not.empty;
    });
  });
});