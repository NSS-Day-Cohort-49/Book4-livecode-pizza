import { SizeHTML } from "./Sizes.js"

export const PizzaParlor = () => {
  return `
    <h1>Mama Leoni's Pizza Place</h1>
    <div class="ingredients--container">
        <article>
            <h2>Sizes</h2>
            ${SizeHTML()}
        </article>
        <article>
            <h2>Crusts</h2>
        </article>
        <article>
            <h2>Toppings</h2>
        </article>
    </div>
    <article id="side_order">
    </article>
      SubmitOrderButton goes here
    <article>
        <h2>Orders Placed</h2>
        Order List goes here
    </article>
  `
}
