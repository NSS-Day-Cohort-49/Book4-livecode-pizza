const database = {
  toppings: [
    {
      id: 1,
      name: "black olives",
      price: 1.25,
      type: "veggie"
    },
    {
      id: 2,
      name: "pepperoni",
      price: 2.25,
      type: "meat"
    },
    {
      id: 3,
      name: "banana peppers",
      price: 1.25,
      type: "veggie"
    },
    {
      id: 4,
      name: "pineapple",
      price: 1.25,
      type: "disgusting"
    },
    {
      id: 5,
      name: "bell peppers",
      price: 1.25,
      type: "veggie"
    },
    {
      id: 6,
      name: "bacon",
      price: 2.25,
      type: "meat"
    }
  ],
  crusts: [
    {
      id: 1,
      type: "deep dish",
      price: 2
    },
    {
      id: 2,
      type: "NY style",
      price: 1
    },
    {
      id: 3,
      type: "traditional hand tossed",
      price: 0
    }
  ],
  sizes: [
    {
      id: 1,
      circumference: 12,
      price: 7
    },
    {
      id: 2,
      circumference: 14,
      price: 10
    },
    {
      id: 3,
      circumference: 16,
      price: 12
    }
  ],
  orders: [
    // Some dummy data for testing listing orders. This is NOT in here as a result of the order form!
    {
      id: 1,
      sizeId: 2,
      crustId: 2,
      timestamp: 1620059468223
    },
    {
      id: 2,
      sizeId: 3,
      crustId: 1,
      timestamp: 1620059468300
    },
    {
      id: 3,
      sizeId: 2,
      crustId: 3,
      timestamp: 1620059468300
    }
  ],
  orders_toppings: [
    {
      id: 1,
      toppingId: 1,
      orderId: 1
    },
    {
      id: 2,
      toppingId: 4,
      orderId: 1
    },
    {
      id: 3,
      toppingId: 5,
      orderId: 2
    }
  ]
}

// will be filled with ids of size, crust, topping
let orderState = {toppings: []}

// methods for interacting with the database
const calcId = (arr) => {
  const lastIndex = arr.length - 1
  if (lastIndex === -1) {
    // return always ends the function
    const newId = 1
    return newId
  }
  const lastItemId = arr[lastIndex].id
  const newId = lastItemId + 1
  return newId
}

// provide access to the database state
export const getSizes = () => [...database.sizes] //no curlies? return is implied!
export const getToppings = () => [...database.toppings] //no curlies? return is implied!
export const getCrusts = () => [...database.crusts] //no curlies? return is implied!
export const getOrdersToppings = () => [...database.orders_toppings]
export const getOrders = () => [...database.orders]

// change the temporary/transient state to reflect the user's change to the UI
export const setOrderSize = (sizeId) => orderState.sizeId = sizeId
export const setOrderTopping = (id) => {
  // Do this: add the id to the array
  // or this: remove the id from the array
  if(orderState.toppings.includes(id)) {
    orderState.toppings = orderState.toppings.filter( (toppingId) => toppingId !== id )
  } else {
    orderState.toppings.push(id)
  }
}
export const setOrderCrust = (crustId) => orderState.crustId = crustId

// change the database/permanent state by creating a new order and n new orders_toppings
export const addCustomerOrder = () => {
  // take the values from transient state ( orderState object )
  // and persist those values in our db state
  // while adding a unique id and a timestamp to the new order
  const newOrder = {
    sizeId: orderState.sizeId,
    crustId: orderState.crustId
  }

  // calculate the unique id for our order
  const lastIndex = database.orders.length - 1
  // ternary statement...if...           ....then....              ..else...
  newOrder.id = lastIndex >= 0 ? database.orders[lastIndex].id + 1 : 1
  newOrder.timestamp = Date.now()
  database.orders.push(newOrder)

  // Loop through the toppings array in our temp state to make records for each in the database, with their associated order id
  for ( const tId of orderState.toppings ) {
    const newOrderTopping = {
      id: database.orders_toppings.length - 1 >= 0 ? database.orders_toppings[lastIndex].id + 1 : 1,
      orderId: newOrder.id,
      toppingId: tId
    }
    database.orders_toppings.push(newOrderTopping)
  }

  // reset orderState to its original state
  orderState = {toppings: []}
  // broadcast a notification that permanent state has changed
  document.dispatchEvent(new CustomEvent("dbStateChanged"))
}


// TODO:
// Change Toppings module
// 1) Change HTML to allow multiple inputs
// 2) Change the topping event listener to record/save multiple selections
// Change Orders module:
// 1) How we calculate the price
// 2) HTML for diplaying the toppings
// 3) Change how we get to the toppings objects
// Change data module
// 1) set function for toppings will add to an array in OrderState
// 2) AddCustomer Order will now not add toppingId to an orderState. It will add an order object AND n orderToppings objects
