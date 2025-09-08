import React from "react";
import YouTube from "react-youtube";

function KaraokeApp() {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="app">
      <h1>Karaoke Web App</h1>
      <p>Ứng dụng karaoke chạy trên YouTube 🎤</p>
      <YouTube videoId="dQw4w9WgXcQ" opts={opts} />
    </div>
  );
}

export default KaraokeApp;
