import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrders() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="placeholder: sm:w-30 w-64 rounded-full bg-yellow-100 px-4 py-2 text-sm text-stone-400 transition-all duration-300 focus:outline-none
                    focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:focus:w-72"
        placeholder="Search Order Number #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
