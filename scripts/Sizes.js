import { getSizes, setOrderSize } from "./data.js"

document.addEventListener("click",
  (event) => {
    if (event.target.name === "size") {
      const sizeId = event.target.value
      setOrderSize(parseInt(sizeId))
    }
  }
)

// Generate a list of all the sizes, with an affordance for selecting the chosen size.
export const SizeHTML = () => {
  const sizes = getSizes()

  // let sizeMenu = `<ul class="choice--list size--list">`
  // for (const size of sizes) {
  //   sizeMenu += `<li class="choice-list-item size--list-item">
  //   <input type="radio" value=${size.id} name="size"> ${size.circumference}-inch
  //   <div class="price">Price: $${size.price.toFixed(2)}</div>
  //   </li>`
  // }
  // sizeMenu += "</ul>"

  // mapping the size data instead of using for...of loop
  const sizeMenu = `<ul class="choice--list size--list">
    ${sizes.map(
      (size) => `<li class="choice-list-item size--list-item">
        <input type="radio" value="${size.id}" name="size"> ${size.circumference}-inch
        <div class="price">Price: $${size.price.toFixed(2)}</div>
      </li>`).join("")
    } </ul>`

  //return a string of HTML
  return sizeMenu
}
