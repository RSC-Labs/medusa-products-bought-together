<p align="center">
  <picture>
    <img alt="Medusa store-analytics logo" width='500' height='150' src="https://raw.githubusercontent.com/RSC-Labs/medusa-products-bought-together/main/docs/medusa-plugin-products-bought-together.png">
  </picture>
</p>

<h1 align="center">
  Medusa Products Bought Together
</h1>

Medusa "Products Bought Together" is a plugin which monitors and provides API for getting products which are frequently bought together.

### Why?

When customer wants to buy product A, he can get information about other products which are frequently bought together with product A.

It is a common scenario for ecommerce, which leds to increasing sales by recommending such products to customers.

### Supported Medusa versions

Choose README dependent on your Medusa version.

<h2>
  Medusa V1
</h2>

[README](https://github.com/RSC-Labs/medusa-products-bought-together/blob/main/v1/README.md)

<h2>
  Medusa V2
</h2>

[README](https://github.com/RSC-Labs/medusa-products-bought-together/blob/main/v2/README.md)

## How it works?

When customer places new order, plugin takes information about all products in order and creates entries in database. If there is already existing pair of products (because they were bought together before), then it increases its ranking. In a result, there is a stored information about relations between products and how frequently they are bought together.

## How can I use it?

When you install a plugin, monitoring is being done automatically.

To use it, you can use API described below:

```yaml
openapi: 3.0.0
info:
  title:  API
  description: API for plugin
  version: 0.0.1
paths:
  /store/boughtTogether/{productId}:
    get:
      summary: List of products
      description: Returns a list of products which are bought together with {productId}
      parameters:
        - name: productId
          in: path
          description: ID of product for which you are looking for other products
          required: true
          schema:
            type: string
      responses:
        '200':
          description: productId passed in URL. Returns empty array if cannot be found in database.
          content:
            application/json:
              schema: 
                type: array
                items:
                  type: object
                  properties:
                    productId:
                      type: string
                    boughtTogetherProductId:
                      type: string
                    frequency:
                      type: number
        '404':
          description: productId not passed in URL
```

For example:

Request:
```https://localhost:9000/store/boughtTogether/prod_1123123123```

Response:
```json
[
    {
        "productId": "prod_1123123123",
        "boughtTogetherProductId": "prod_2223432432423",
        "frequency": 10
    },
    {
        "productId": "prod_1123123123",
        "boughtTogetherProductId": "prod_334343434343",
        "frequency": 4
    }
]
```

## Contribution

Contributions are welcome and they are greatly appreciated!

## License

MIT

---

© 2025 RSC https://rsoftcon.com/
