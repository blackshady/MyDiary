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
} from './testData';

chai.use(sinonChai);

// tip gotten from https://github.com/danawoodman/sinon-express-mock

const res = mockRes();

describe();