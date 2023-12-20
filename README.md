<img src='https://raw.githubusercontent.com/RSC-Labs/medusa-products-bought-together/main/docs/icon_1280.png' width='160' height='150' alt='Medusa products bought together icon'>

Medusa "Products Bought Together" is a plugin which monitors and provides API for getting products which are frequently bought together.

### Why?

When customer wants to buy product A, he can get information about other products which are frequently bought together with product A.

It is a common scenario for ecommerce, which leds to increasing sales by recommending such products to customers.

## Getting Started

1. Install the package with `yarn add medusa-products-bought-together` or `npm i medusa-products-bought-together`.
2. In `medusa-config.js`, add the plugin to the `plugins` array.

```js
const plugins = [
  // ... other plugins
  {
    resolve: `medusa-products-bought-together`,
    options: {
      
    }
  }
]
```
## How it works?

When customer places new order, plugin takes information about all products in order and creates entries in database. If there is already existing pair of products (because they were bought together before), then it increases its ranking. In a result, there is a stored information about relations between products and how frequently they are bought together.

## How can I use it?

When you install a plugin, monitoring is being done automatically.

To use it, you can use API described below:

```yaml
openapi: 3.0.0
info:
  title: medusa-products-bought-together API
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
### Configuration

There is a limit set for GET requests equal to: `5`

You can change this limit by providing `getLimit` option to plugin:

```js
const plugins = [
  // ... other plugins
  {
    resolve: `medusa-products-bought-together`,
    options: {
        getLimit: 10
    }
  }
]
```

## TODO

[ ] Tests

[ ] Make limit per request, as we can't use "query" params in API routes (req.body in GET REST API sounds weak).

## Contribution

Contributions are welcome and they are greatly appreciated!

## License

MIT

---

© 2023 RSC https://rsoftcon.com/