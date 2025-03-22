/*
 * Copyright 2025 RSC-Labs, https://rsoftcon.com/
 *
 * MIT License
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MedusaService } from "@medusajs/framework/utils"
import { InferTypeOf } from "@medusajs/framework/types"
import { Logger } from "@medusajs/framework/types"
import ProductsBoughtTogether from "./models/productsBoughtTogether"

type ProductsBoughtTogetherType = InferTypeOf<typeof ProductsBoughtTogether>

type ModuleOptions = {
  getLimit?: number
}

type InjectedDependencies = {
}

class ProductsBoughtTogetherService extends MedusaService({
  ProductsBoughtTogether
}) {

  protected options_?: ModuleOptions
  protected logger_: Logger;

  constructor({
  }: InjectedDependencies, options?: ModuleOptions) {
    super(...arguments)
    this.options_ = options;
  }

  async getByProductsId(productId: string) : Promise<ProductsBoughtTogetherType[]> {
    const productsBoughtTogether = await this.listProductsBoughtTogethers({
      $or: [
        {
          productId1: productId,
        },
        {
          productId2: productId
        },
      ],
    })
    console.log(productsBoughtTogether);
    return productsBoughtTogether;
  }

  async update(productIds: string[]): Promise<void> {
    for (let i = 0; i < productIds.length; i++) {
      const productId1 = productIds[i];

      for (let j = i + 1; j < productIds.length; j++) {
        const productId2 = productIds[j];

        const possibleEntry1 = await this.listProductsBoughtTogethers({
          productId1: productId1,
          productId2: productId2
        })
        if (possibleEntry1.length) {
          await this.updateProductsBoughtTogethers({
            ...possibleEntry1[0],
            frequency: ++possibleEntry1[0].frequency
          })
        } else {
          const possibleEntry2 = await this.listProductsBoughtTogethers({
            productId1: productId2,
            productId2: productId1
          })
          if (possibleEntry2.length) {
            await this.updateProductsBoughtTogethers({
              ...possibleEntry2[0],
              frequency: ++possibleEntry2[0].frequency
            })
          } else {
            await this.createProductsBoughtTogethers({
              productId1: productId1,
              productId2: productId2,
              frequency: 1
            })
          }
        }
      }
    }
  }
}

export default ProductsBoughtTogetherService