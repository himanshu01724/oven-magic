import Button from "../../user-interface/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "./cartSlice";
import DeleteItem from "./DeleteItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="py-3">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
