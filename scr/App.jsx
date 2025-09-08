import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Tìm kiếm: ${query}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🎤 Karaoke Web App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập tên bài hát..."
          style={{ padding: "10px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Tìm kiếm
        </button>
      </form>
    </div>
  );
}
