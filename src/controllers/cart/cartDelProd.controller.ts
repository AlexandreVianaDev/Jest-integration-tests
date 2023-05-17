import { Request, Response } from 'express'
import cartDelProdService from '../../services/cart/cartDelProd.service'

const cartDelProdController = async (req: Request, res: Response) => {
  const product_id = parseInt(req.params.product_id)

  const { userEmail } = req

  await cartDelProdService(userEmail, product_id)

  return res.sendStatus(204)
}

export default cartDelProdController
