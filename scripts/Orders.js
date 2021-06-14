import {
  getCrusts,
  getOrders,
  getToppings,
  getSizes,
  getOrdersToppings
} from "./data.js";

// get all the data, so we can find the objects that go with the orders, since the only thing the orders contain are the ids of their crusts, toppings and sizes
const crusts = getCrusts();
const toppings = getToppings();
const sizes = getSizes();

export const Orders = () => {

  const orders = getOrders();
  const ordersToppings = getOrdersToppings();

  const arrayOfOrderHTMLStrings = orders.map((order) => {
    let totalCost = 0

    // Find the matching size
    const foundSize = sizes.find((sizeObject) => {
      if (sizeObject.id === order.sizeId) {
        return true
      }
    })
    totalCost += foundSize.price

    // Find the matching crust ( this syntax works the same as the sizes.find above. How? If you're not sure, ask us.)
    const foundCrust = crusts.find((crust) => crust.id === order.crustId)
    totalCost += foundCrust.price

    // Find the matching topping
    // const foundTopping = toppings.find((topping) => topping.id === order.toppingId)
    // totalCost += foundTopping.price

    const foundOrdersToppings = ordersToppings.filter( (orderTopping) => {
        return orderTopping.orderId === order.id
    })

    const foundToppings = toppings.filter( (topping) => {
      return foundOrdersToppings.find( (orderTopping) => {
          return orderTopping.toppingId === topping.id
      })
    })

    for (const topping of foundToppings ) {
      totalCost += topping.price
    }

    // Return the HTML representation of the order
    return `
        <div class="order">
            Order #${order.id} placed at
            ${new Date(order.timestamp).toLocaleString()},
            is a ${foundSize.circumference}-inch ${foundCrust.type}
            with ${foundToppings.map( (topping) => topping.name ).join(" and ")},
            for a cost of ${totalCost.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
           Yum.
        </div>
    `;
  });

  const html = arrayOfOrderHTMLStrings.join("");

  return html;
};
