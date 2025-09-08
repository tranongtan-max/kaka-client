import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { io } from "socket.io-client";

// ⚠️ Đổi URL này thành Render server của bạn
const socket = io("https://karaoke-socket.onrender.com");

// ⚠️ Dán API key YouTube Data API vào đây
const API_KEY = "YOUR_YOUTUBE_API_KEY";

function App() {
  const [mode, setMode] = useState(null); // null | "player" | "controller"
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Nếu là player thì lắng nghe lệnh socket
  useEffect(() => {
    if (mode === "player") {
      socket.on("play-video", (id) => {
        setVideoId(id);
      });
    }
    return () => {
      socket.off("play-video");
    };
  }, [mode]);

  // Tìm kiếm video karaoke
  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=6&q=${encodeURIComponent(
          query + " karaoke"
        )}&key=${API_KEY}`
      );
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Lỗi tìm kiếm:", err);
    }
  };

  // Gửi lệnh phát video tới server
  const handlePlay = (id) => {
    socket.emit("play-video", id);
  };

  const playerOpts = {
    width: "100%",
    height: "500",
    playerVars: { autoplay: 1 },
  };

  // =================== Chọn chế độ ===================
  if (!mode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">🎤 Karaoke Web App</h1>
        <p>Chọn chế độ để bắt đầu:</p>
        <button
          className="px-6 py-3 bg-green-600 rounded hover:bg-green-700"
          onClick={() => setMode("player")}
        >
          🎬 Player (Màn hình chính)
        </button>
        <button
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => setMode("controller")}
        >
          📱 Controller (Điện thoại / Tablet)
        </button>
      </div>
    );
  }

  // =================== Player Mode ===================
  if (mode === "player") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-4">🎬 Karaoke Player</h1>
        <YouTube videoId={videoId} opts={playerOpts} />
        <p className="mt-2 opacity-70">Đang phát: {videoId}</p>
      </div>
    );
  }

  // =================== Controller Mode ===================
  if (mode === "controller") {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">📱 Karaoke Controller</h1>

        {/* Ô tìm kiếm */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Tìm bài hát karaoke..."
            value={query}
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

        {/* Kết quả */}
        <ul className="space-y-2">
          {results.map((item) => (
            <li
              key={item.id.videoId}
              className="cursor-pointer hover:text-blue-400"
              onClick={() => handlePlay(item.id.videoId)}
            >
              🎵 {item.snippet.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
