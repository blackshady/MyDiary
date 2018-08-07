import chai, {
  expect
} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
import {
  mockRes,
} from 'sinon-express-mock'

import EntriesValidator from '../../middlewares/EntriesValidator';
import {
  noStoryReq,
  shortEntryReq,
  wrongParamsReq,
  char50Req,
  realEntryReq,
  realParamsReq
} from './testData';

chai.use(sinonChai);

// tip gotten from https://github.com/danawoodman/sinon-express-mock

const res = mockRes();

describe('EntriesValidator: Handles all entries validation ', () => {
  const next = sinon.spy();
  describe('validateCreateEntry', () => {
    it('should return a 400 status code when there is no story filed', async () => {
      await EntriesValidator.validateCreateEntry(noStoryReq, res, next)
      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({
        status: 'error',
        message: 'Bad request, fields should not be empty',
      })
    })

    it('should return a 400 status code with a message when title or story  filed is not up to five character', async () => {
      await EntriesValidator.validateCreateEntry(shortEntryReq, res, next)
      expect(res.status).to.be.calledWith(400);
      expect(res.json).to.be.calledWith({
        status: 'error',
        message: 'Fields length must not be less than five',
      })
    })

    it('should call the next function', async () => {
      await EntriesValidator.validateCreateEntry(realEntryReq, res, next)
      expect(next).to.be.called;
    })
  })

  describe('validateParams', () => {
    it('should return a 400 status code and an error message if params is not a number', async () => {
      await EntriesValidator.validateParams(wrongParamsReq, res, next)
      expect(res.json).to.be.calledWith({
        status: 'error',
        message: 'Entry Id should be a number',
      })
    })
    it('should call the next function', async () => {
      await EntriesValidator.validateParams(realParamsReq, res, next)
      expect(next).to.be.called;
    })
  })

  describe('validateModifyEntry', () => {
    it('should return a 400 status code and an error message if title is more the 50 character', async () => {
      await EntriesValidator.validateModifyEntry(char50Req, res, next)
      expect(res.json).to.be.calledWith({
        status: 'error',
        message: 'Title should not be more than 50 characters',
      })
    })

    it('should call the next function', async () => {
      await EntriesValidator.validateModifyEntry(realEntryReq, res, next)
      expect(next).to.be.called;
    })
  })

});