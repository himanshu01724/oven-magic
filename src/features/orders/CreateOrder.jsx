import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../user-interface/Button";
import { useSelector } from "react-redux";
import { getCart, clearCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import Store from "../../Store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;

  const finalPrice = totalPrice + priorityPrice;
  console.log(cart);

  const userName = useSelector((store) => store.user.username);

  const navigate = useNavigation();
  const formError = useActionData();
  const isSubmit = navigate.state === "submitting";

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="space-y-5 py-3">
      <h2 className="text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              className="input w-full"
              defaultValue={userName}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formError?.phone && (
              <p className="mt-4 rounded-full bg-red-100 text-xs  text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="flex-grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-5 w-4 accent-yellow-400 "
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div className="mt-2">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmit} type="primary">
            {isSubmit
              ? "Placing Order ..."
              : `Order now for ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Provide a valid phone number or your pizza might be delivered to wrong place and you'll sleep hungry";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);

  Store.dispatch(clearCart());

  console.log(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
