import productsMock from "./products.mock";

export default {
  cartAddProductDefaultMock: {
    product_id: productsMock.createProductDefaultResponseMock.id,
  },
  cartAddSingleProductDefaultMock: {
    id: productsMock.createProductDefaultResponseMock.id,
    name: productsMock.createProductDefaultResponseMock.name,
    description: productsMock.createProductDefaultResponseMock.description,
    price: productsMock.createProductDefaultResponseMock.price,
  },
  cartAddProductDefaultResponseMock: {
    id: 1,
    subtotal: productsMock.createProductDefaultResponseMock.price,
    products: [
      {
        id: productsMock.createProductDefaultResponseMock.id,
        name: productsMock.createProductDefaultResponseMock.name,
        description: productsMock.createProductDefaultResponseMock.description,
        price: productsMock.createProductDefaultResponseMock.price,
      },
    ],
  },
  cartAddProductSQLMock: {
    subtotal: productsMock.createProductDefaultResponseMock.price,
    // products: [],
  },
};
