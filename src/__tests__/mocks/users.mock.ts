import bcrypt from "bcryptjs";

//USER
const id = 1;
const name = "name";
const email = "email@mail.com";
const password = "123456";

export default {
  createUserDefaultMock: {
    name,
    email,
    password,
  },
  createUserDefaultResponseMock: {
    id,
    name,
    email,
    cart: {
      id: 1,
      subtotal: 0,
    },
  },
  createUserBySQLMock: {
    name,
    email,
    password,
    cart: {
      id: 1,
      // subtotal: 0,
    },
  },
  loginUserDefaultMock: {
    email,
    password,
  },
  getUsersDefaultMock2: {
    id,
    name,
    email,
    buys: [],
    cart: {
      id: 1,
      subtotal: 0,
      products: [],
    },
  },
  getUsersDefaultMock: {
    id,
    name,
    email,
    buys: [],
  },
  updateUserPasswordDefaultMock: {
    password: "12345678",
  },
};
