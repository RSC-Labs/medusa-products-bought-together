import { Product, TransactionBaseService } from "@medusajs/medusa"
import { ProductsBoughtTogether } from "../models/productsBoughtTogether";

type BoughtTogetherResult = {
  productId: string,
  boughtTogetherProductId: string,
  frequency: number
}

class ProductsBoughtTogetherService extends TransactionBaseService {

  private GET_LIMIT: number;

  constructor(container, options) {
    super(container)
    // options contains plugin options
    this.GET_LIMIT = options.getLimit
  }

  async getProductsBoughtTogether(productId: string, limit?: number) : Promise<BoughtTogetherResult[]> {

    const existingEntries = await this.activeManager_
      .getRepository(ProductsBoughtTogether)
      .createQueryBuilder("pbt")
      .select([
        'CASE WHEN pbt.product_id = :productId THEN pbt.bought_together_product_id ELSE pbt.product_id END AS bought_together_product_id',
        'SUM(frequency) AS total_frequency'
      ])
      .addSelect(['COUNT(*) AS frequency'])
      .where('(:productId IN (pbt.product_id, pbt.bought_together_product_id))', {
        productId
      })
      .groupBy('pbt.product_id, pbt.bought_together_product_id')
      .orderBy('total_frequency', 'DESC')
      .take(limit ? limit : (this.GET_LIMIT ? this.GET_LIMIT : 5))
      .getRawMany();

    return existingEntries.map(entry => {
      return {
        productId: productId,
        boughtTogetherProductId: entry.bought_together_product_id,
        frequency: entry.total_frequency
      }
    });
  }

  async updateProductsBoughtTogether(productIds: string[]): Promise<void> {
    for (let i = 0; i < productIds.length; i++) {
      const productId1 = productIds[i];

      for (let j = i + 1; j < productIds.length; j++) {
        const productId2 = productIds[j];

        // Check if the pair already exists in the ProdcutsBoughtTogether table
        const existingEntry = await this.activeManager_
          .getRepository(ProductsBoughtTogether)
          .createQueryBuilder("pbt")
          .where('(pbt.product_id = :productId1 AND pbt.bought_together_product_id = :productId2)', {
            productId1,
            productId2,
          })
          .orWhere('(pbt.product_id = :productId2 AND pbt.bought_together_product_id = :productId1)', {
            productId1,
            productId2,
          })
          .getOne();
        
        if (existingEntry) {
          existingEntry.frequency += 1;
          await this.activeManager_.getRepository(ProductsBoughtTogether).save(existingEntry);
        } else {
          const newEntry = new ProductsBoughtTogether();
          newEntry.product = await this.activeManager_.getRepository(Product).findOne({
            where: { id: productId1 }
          });
          newEntry.boughtTogetherProduct = await this.activeManager_.getRepository(Product).findOne({
            where: { id: productId2 }
          });
          newEntry.frequency = 1;
          await this.activeManager_.getRepository(ProductsBoughtTogether).save(newEntry);
        }
      }
    }
  }
}
export default ProductsBoughtTogetherService