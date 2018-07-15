import {
  expect
}
from "chai";


describe("sample test", () => {
  it("check if mocha test is working", () => {
    expect("hello").to.be.a('string');
  });
});