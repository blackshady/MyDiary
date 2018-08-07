/**
 * @exports testData
 * @description This file contains all dummy data for testing user Authentication
 * 
 * */
const realUser = {
  email: 'victor09@gmail.com',
  username: 'blackshady',
  password: '1234567',
}
const badEmail = {
  email: 'slimbabymail.com',
  username: 'whatsMAName',
  password: 'whatIsThe',
}
const noPass = {
  email: 'mosoes@gmail.com',
  username: 'keyleXy',
}
const noUserName = {
  email: 'slomo@gmail.com',
  password: '1234567',
}
const wrongLength = {
  email: 'franckp@gmail.com',
  password: '187',
  username: 'blady',
}
const emptyEmail = {
  email: '',
  password: '12',
  username: 'wizkill',
}

export {
  realUser,
  badEmail,
  noPass,
  noUserName,
  wrongLength,
  emptyEmail
};