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
        placeholder="Search Order Number"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
