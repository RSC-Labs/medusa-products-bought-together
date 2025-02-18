import type { 
    MedusaRequest, 
    MedusaResponse,
  } from "@medusajs/medusa"
import ProductsBoughtTogetherService from "src/services/productsBoughtTogether";
  
  export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
  ) => {
    const product_id = req.params.product_id;
    if (product_id) {
      const productsBoughtTogetherService: ProductsBoughtTogetherService = req.scope.resolve('productsBoughtTogetherService');
      const result = await productsBoughtTogetherService.getProductsBoughtTogether(product_id);
      res.status(200).json(result);
    } else {
      res.status(404).json(`Product_id ${product_id} not found`)
    }
  }