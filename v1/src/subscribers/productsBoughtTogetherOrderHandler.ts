import {
  OrderService,
  SubscriberArgs,
  SubscriberConfig,
} from "@medusajs/medusa";
import ProductsBoughtTogetherService from "src/services/productsBoughtTogether";

type OrderPlacedEvent = {
  id: string;
  no_notification: boolean;
};

export default async function productsBoughtTogetherOrderHandler({
  data,
  eventName,
  container,
}: SubscriberArgs<OrderPlacedEvent>) {
  const orderService: OrderService = container.resolve('orderService');

  const order = await orderService.retrieve(data.id, {
    select: ["items"],
    relations: ["items", "items.variant"],
  });

  const { items } = order;

  const productsBoughtTogetherService: ProductsBoughtTogetherService = container.resolve('productsBoughtTogetherService');

  const uniqueProductIds: string[] = Array.from(new Set(items.map(item => item.variant.product_id)));

  await productsBoughtTogetherService.updateProductsBoughtTogether(uniqueProductIds);
}

export const config: SubscriberConfig = {
  event: OrderService.Events.PLACED,
  context: {
    subscriberId: "products-bought-together-order-handler",
  },
};