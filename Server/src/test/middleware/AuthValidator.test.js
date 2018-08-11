import chai, {
  expect
} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import {
  mockRes
} from 'sinon-express-mock'

import AuthValidator from '../../middlewares/AuthValidator';
import {
  noEmailReq,
  notEmailReq,
  noPassReq,
  notLenReq,
  realReq
} from './testData';

chai.use(sinonChai);

// tip gotten from https://github.com/danawoodman/sinon-express-mock

const res = mockRes();

describe('AuthValidator/ Handles login and signup input validation', () => {

  describe('validateLogin/ validate login input', () => {
    const next = sinon.spy();
    it('should return a status of 400 and an error message when there is no email filed', async () => {
      await AuthValidator.validateLogin(noEmailReq, res, next);
      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({
        status: 'error',
        message: 'Email must not be empty',
      })
    })

    it('should return a status of 400 and an error message when there is no password filed', async () => {
      await AuthValidator.validateLogin(noPassReq, res, next);
      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({
        status: 'error',
        message: 'Password must not be empty',
      })
    })

    it('should return a status of 400 and an error message when character length is not up to five', async () => {
      await AuthValidator.validateLogin(notLenReq, res, next);
      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({
        status: 'error',
        message: 'Fields characters must not be less than five',
      })
    })

    it('should return a status of 400 and an error message if it not a correct Email', async () => {
      await AuthValidator.validateLogin(notEmailReq, res, next);
      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({
        status: 'error',
        message: 'It seems your email is not valid, or is incorrect',
      })
    })

    it('should call the next function when a info is passed', async () => {
      await AuthValidator.validateLogin(realReq, res, next);
      expect(next).to.be.called;
    })
  });
})