import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProductsBoughtTogether1702833448140 implements MigrationInterface {
    name = 'CreateProductsBoughtTogether1702833448140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'products_bought_together',
              columns: [
                { name: 'id', type: 'character varying', isPrimary: true },
                { name: 'product_id', type: 'character varying' },
                { name: 'bought_together_product_id', type: 'character varying' },
                { name: 'frequency', type: 'int' },
                { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()'},
                { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()'}
              ],
              foreignKeys: [
                {
                  columnNames: ['product_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'public.product',
                },
                {
                  columnNames: ['bought_together_product_id'],
                  referencedColumnNames: ['id'],
                  referencedTableName: 'public.product',
                },
              ],
            }),
            true
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products_bought_together', true);
    }
}
