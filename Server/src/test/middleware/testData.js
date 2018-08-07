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

const noStoryReq = mockReq({
  body: {
    title: 'I can only imagine the condition'
  }
})


const shortEntryReq = mockReq({
  body: {
    title: 'tom',
    story: 'come'
  }
})

const wrongParamsReq = mockReq({
  params: {
    entryId: 'hello'
  }
})

const realParamsReq = ({
  params: {
    entryId: '1'
  }
});

const realEntryReq = mockReq({
  body: {
    title: 'Jimmy leaves at home in the treller',
    story: 'spending time making me look good, that is great we do like it, ahh but.'
  }
})
const char50Req = mockReq({
  body: {
    title: 'tom jay would like to be free, Even i have come to this point where all I ever need God gave,',
    story: ' yet tom jay isnt free '
  }
})
export {
  noEmailReq,
  noPassReq,
  notLenReq,
  notEmailReq,
  realReq,
  wrongTokenReq,
  invalidTokenReq,
  noStoryReq,
  wrongParamsReq,
  realParamsReq,
  shortEntryReq,
  char50Req,
  realEntryReq
};