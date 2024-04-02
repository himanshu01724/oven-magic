import { useState } from "react";

export default function SearchOrders() {
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
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
