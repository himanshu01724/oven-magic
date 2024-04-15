import LinkButton from "../../user-interface/LinkButton";
import Button from "../../user-interface/Button";
import CartItem from "./CartItem";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-8 text-xl font-semibold">Your cart, %NAME%</h2>
      <ul className="mb-5 mt-3 divide-y divide-stone-200 border-b">
        {" "}
        {fakeCart.map((item, i) => (
          <CartItem item={item} key={i} />
        ))}
      </ul>
      <div className="space-x-3">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
