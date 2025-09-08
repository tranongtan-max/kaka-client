import React, { useState } from "react";
import YouTube from "react-youtube";

// ⚠️ Dán API Key YouTube Data API v3 vào đây
const API_KEY = "YOUR_YOUTUBE_API_KEY";

function KaraokeApp() {
  const [query, setQuery] = useState("");
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ"); // Video mặc định
  const [results, setResults] = useState([]);

  // Hàm tìm kiếm video karaoke
  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(
          query + " karaoke"
        )}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.items) {
        setResults(data.items);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

  // Khi chọn 1 video từ danh sách
  const handleSelect = (id) => {
    setVideoId(id);
    setResults([]); // ẩn danh sách sau khi chọn
  };

  const opts = {
    width: "100%",
    height: "500",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">🎤 Karaoke Web App</h1>

      {/* Tìm kiếm */}
      <div className="flex gap-2 mb-4 w-full max-w-xl">
        <input
          type="text"
          value={query}
          placeholder="Nhập tên bài hát..."
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded text-black"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Tìm
        </button>
      </div>

      {/* Danh sách kết quả */}
      {results.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg w-full max-w-xl mb-4">
          <h2 className="text-lg font-semibold mb-2">Kết quả tìm kiếm:</h2>
          <ul className="space-y-2">
            {results.map((item) => (
              <li
                key={item.id.videoId}
                className="cursor-pointer hover:text-blue-400"
                onClick={() => handleSelect(item.id.videoId)}
              >
                🎵 {item.snippet.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Player YouTube */}
      <div className="w-full max-w-4xl">
        <YouTube videoId={videoId} opts={opts} />
      </div>
    </div>
  );
}

export default KaraokeApp;
