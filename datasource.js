const { DataSource } = require("typeorm")

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "medusa-z0g5",
  entities: [
    "node_modules/@medusajs/medusa/dist/models/*.js",
    "dist/models/products_bought_together.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
  autoLoadEntities: true
})

module.exports = {
  datasource: AppDataSource,
}