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

import { Migration } from '@mikro-orm/migrations';

export class Migration20250315132351 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "products_bought_together" ("id" text not null, "productId1" text not null, "productId2" text not null, "frequency" integer not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "products_bought_together_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_products_bought_together_deleted_at" ON "products_bought_together" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "products_bought_together" cascade;`);
  }

}
