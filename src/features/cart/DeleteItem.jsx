import Button from "../../user-interface/Button";
import { removeItemFromCart } from "./cartSlice";
import { useDispatch } from "react-redux";

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  console.log(pizzaId);
  return (
    <Button type="small" onClick={() => dispatch(removeItemFromCart(pizzaId))}>
      Delete
    </Button>
  );
}
