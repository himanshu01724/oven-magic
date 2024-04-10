import { Link } from "react-router-dom";
import SearchOrders from "../features/orders/SearchOrders";
import UserName from "../features/user/UserName";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-[1rem]">
        Oven Magic
      </Link>
      <SearchOrders />
      <UserName />
    </header>
  );
}
