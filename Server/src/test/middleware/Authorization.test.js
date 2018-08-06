import chai, {
  expect
} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import {
  mockRes
} from 'sinon-express-mock'

import Authorization from '../../middlewares/Authorization';
import {
  wrongTokenReq,
  invalidTokenReq
} from './testData';

chai.use(sinonChai);


const res = mockRes();

describe('Authorization  Validate users token', () => {
  const next = sinon.spy();
  it('should return a 401 status  code and an error message when there is no token', async () => {
    await Authorization.verifyToken(wrongTokenReq, res, next);
    expect(res.status).to.be.calledWith(401);
    expect(res.json).to.be.calledWith({
      status: 'error',
      message: ' Unauthorized User can not access this page, please login or signup',
    })
  })

  it('should return a 403 status code and an error message when token is invalid', async () => {
    await Authorization.verifyToken(invalidTokenReq, res, next);
    expect(res.status).to.be.calledWith(403);
    expect(res.json).to.be.calledWith({
      status: 'error',
      message: ' Access forbidden, Invalid user token',
    })
  })
})