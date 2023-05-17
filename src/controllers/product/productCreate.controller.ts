import { Request, Response } from 'express'
import { IProduct } from '../../interfaces/product'
import productCreateService from '../../services/product/productCreate.service'

const productCreateController = async (req: Request, res: Response) => {
  const data = req.body

  const product: IProduct = await productCreateService(data)

  return res.status(201).json(product)
}

export default productCreateController
