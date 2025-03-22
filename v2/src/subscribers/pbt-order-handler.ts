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

import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils";
import { IOrderModuleService, OrderDTO } from "@medusajs/framework/types";
import { PRODUCTS_BOUGHT_TOGETHER_MODULE } from "../modules/productsBoughtTogether";
import ProductsBoughtTogetherService from "../modules/productsBoughtTogether/service";

export default async function pbtOrderHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {

  const orderService: IOrderModuleService = container.resolve(Modules.ORDER);

  const order: OrderDTO = await orderService.retrieveOrder(data.id, {
    relations: [
      "items"
    ]
  })

  if (order.items) {
    const uniqueProductIds: string[] = Array.from(new Set(order.items.map(item => item.product_id))).filter(entry => entry !== null && entry !== undefined);
    
    const productsBoughtTogetherService: ProductsBoughtTogetherService = container.resolve(PRODUCTS_BOUGHT_TOGETHER_MODULE);

    productsBoughtTogetherService.update(uniqueProductIds);
  }
}

export const config: SubscriberConfig = {
  event: `order.placed`,
}