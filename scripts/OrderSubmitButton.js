import { addCustomerOrder } from "./data.js"

document.addEventListener("click",
  (event) => {
    if (event.target.id === "submitOrderButton") {
      addCustomerOrder()
    }
  }
)

export const OrderSubmitButton = () => {
  return `<button id="submitOrderButton">Submit Order</button>`
}
