import { PizzaParlor } from "./PizzaParlor.js"

console.log("hello, world!")

const render = () => {
  document.querySelector("#container").innerHTML = PizzaParlor()
}

render()
