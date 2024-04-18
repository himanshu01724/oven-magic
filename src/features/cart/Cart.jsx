import LinkButton from "../../user-interface/LinkButton";
import Button from "../../user-interface/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useSelector, useDispatch } from "react-redux";
import { gettotalPizza, clearCart } from "./cartSlice";

function Cart() {
  const userName = useSelector((Store) => Store.user.username);
  const cart = useSelector((store) => store.cart.cart);
  const pizzaQuantity = useSelector(gettotalPizza);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-8 text-xl font-semibold">Your cart, {userName}</h2>
      <ul className="mb-5 mt-3 divide-y divide-stone-200 border-b">
        {" "}
        {cart.map((item, i) => (
          <CartItem item={item} key={i} />
        ))}
      </ul>

      <div className="space-x-3">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
