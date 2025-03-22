import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { MedusaError, MedusaErrorTypes } from "@medusajs/utils"
import ProductsBoughtTogetherService from "../../../../modules/productsBoughtTogether/service";
import { PRODUCTS_BOUGHT_TOGETHER_MODULE } from "../../../../modules/productsBoughtTogether";

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {

  const productsBoughtTogetherService: ProductsBoughtTogetherService = req.scope.resolve(
    PRODUCTS_BOUGHT_TOGETHER_MODULE
  );

  const rawRequest = req as unknown as any;
  const productId = rawRequest.params.product_id;

  try {
    const result = await productsBoughtTogetherService.getByProductsId(productId)
    res.status(200).json(result); 
  } catch (error) {
    throw new MedusaError(
      MedusaErrorTypes.DB_ERROR,
      error.message
    )
  }
}