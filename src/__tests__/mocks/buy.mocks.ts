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
  buyDefaultResponseMock: {
    id: productsMock.createProductDefaultResponseMock.id,
    total: productsMock.createProductDefaultResponseMock.price,
  },
};
