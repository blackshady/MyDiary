import {
  mockReq,
  mockRes
} from 'sinon-express-mock'

const noEmailReq = mockReq({
  body: {
    email: "",
    password: '1234567',
  }
})

const noPassReq = mockReq({
  body: {
    email: 'victordoe@gmail.com',
  }
})

const notLenReq = mockReq({
  body: {
    email: 'victorblack@gmail.com',
    password: '123'
  }
})

const notEmailReq = mockReq({
  body: {
    email: 'victorblackgmail.com',
    password: '123434bggjj64'
  }
})

const realReq = mockReq({
  body: {
    email: 'victorblack@gmail.com',
    password: '123434bggjj64'
  }
});

const wrongTokenReq = mockReq({
  headers: {
    authorization: 'Bearer: '
  }
});

const invalidTokenReq = mockReq({
  headers: {
    authorization: 'Bearer: AbcdefchjkmumamabouttocryCDFJKWQZ'
  }
});
export {
  noEmailReq,
  noPassReq,
  notLenReq,
  notEmailReq,
  realReq,
  wrongTokenReq,
  invalidTokenReq
};