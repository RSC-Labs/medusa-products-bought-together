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

import ProductsBoughtTogetherService from "./service"
import { Module } from "@medusajs/framework/utils"

export const PRODUCTS_BOUGHT_TOGETHER_MODULE = "productsBoughtTogetherService"

export default Module(PRODUCTS_BOUGHT_TOGETHER_MODULE, {
  service: ProductsBoughtTogetherService
})