import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Home from "./user-interface/Home";
import Cart from "./features/cart/Cart";
import CreateOrder, {
  action as createOrderActions,
} from "./features/orders/CreateOrder";
import Order, { orderSeachById } from "./features/orders/Order";
import AppLayout from "./user-interface/AppLayout";
import Error from "./user-interface/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />, //parent route + it does not contain any data so it is a parent route
    errorElement: <Error />,
    children: [
      //child routes
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderActions,
      },
      {
        path: "/order/:OrderId",
        element: <Order />,
        loader: orderSeachById,
        errorElement: <Error />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
