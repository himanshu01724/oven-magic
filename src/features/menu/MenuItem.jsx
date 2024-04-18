import Button from "../../user-interface/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const totalPizzaQuantity = useSelector(getCurrentQuantityById(id));
  const pizzaExist = totalPizzaQuantity > 0;
  console.log(totalPizzaQuantity);

  function handleClick() {
    const newPizzaEntry = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItemToCart(newPizzaEntry));
    console.log(cart);
  }

  return (
    <li className="flex gap-10 py-3">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="font-stone-500 text-sm capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className=" mt-auto flex justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <div className="space-x-2">
            {pizzaExist && <DeleteItem pizzaId={id} />}
            {!soldOut && !pizzaExist && (
              <Button type="small" onClick={handleClick}>
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
