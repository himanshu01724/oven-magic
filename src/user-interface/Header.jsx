import { Link } from "react-router-dom";
import SearchOrders from "../features/orders/SearchOrders";

export default function Header() {
  return (
    <header>
      <Link to="/">Oven Magic</Link>
      <SearchOrders />
    </header>
  );
}
