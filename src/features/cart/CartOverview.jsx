import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { gettotalPizza, getTotalPrice } from "./cartSlice";

function CartOverview() {
  const totalPizza = useSelector(gettotalPizza);

  const totalPrice = useSelector(getTotalPrice);
  console.log(totalPizza);

  if (!totalPizza) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 sm:text-base">
      <p className="space-x-3 font-semibold text-stone-300 sm:space-x-10">
        <span>{totalPizza} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
