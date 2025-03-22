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

import { model } from "@medusajs/framework/utils"

const ProductsBoughtTogether = model.define("productsBoughtTogether", {
  id: model.id().primaryKey(),
  productId1: model.text(),
  productId2: model.text(),
  frequency: model.number()
})

export default ProductsBoughtTogether