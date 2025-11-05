import React, { useEffect, useState } from "react";

const PublicChat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    let ws;
    let reconnectTimer;

    const connect = () => {
      let ws = new WebSocket("wss://yahoo-app.onrender.com/chat/ws");

      ws.onopen = () => {
        console.log("✅ Connected to chat server");
        setSocket(ws);
      };

      ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                if (data.type === "history") {
                // Only set if messages state is empty
                setMessages((prev) => {
                    if (prev.length === 0) {
                    return data.messages.map((m) => ({
                        username: m.username,
                        message: m.message,
                        time: new Date(m.timestamp).toLocaleTimeString(),
                    }));
                    }
                    return prev;
                });
                } else if (data.type === "chat") {
                const m = data.message;
                setMessages((prev) => {
                    // Avoid duplicates
                    const exists = prev.some(
                    (msg) =>
                        msg.username === m.username &&
                        msg.message === m.message &&
                        msg.time === new Date(m.timestamp).toLocaleTimeString()
                    );
                    if (exists) return prev;

                    return [
                    ...prev,
                    {
                        username: m.username,
                        message: m.message,
                        time: new Date(m.timestamp).toLocaleTimeString(),
                    },
                    ];
                });
                }
            } catch (err) {
                console.error("Error parsing WS data:", err);
            }
        };

      ws.onclose = () => {
        console.warn("⚠️ WebSocket closed. Reconnecting in 2s...");
        reconnectTimer = setTimeout(connect, 2000);
      };

      ws.onerror = (err) => {
        console.error("WebSocket error:", err);
        ws.close();
      };
    };

    connect();

    return () => {
      if (ws) ws.close();
      if (reconnectTimer) clearTimeout(reconnectTimer);
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.warn("⚠️ WebSocket not ready yet");
      return;
    }

    socket.send(
      JSON.stringify({
        username: username || "Guest",
        message: input.trim(),
      })
    );

    setInput("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>💬 Public Chat</h2>

      <input
        type="text"
        placeholder="Enter your name..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#888", textAlign: "center" }}>
            No messages yet. Start chatting!
          </p>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "6px" }}>
            <strong>{msg.username}: </strong>
            <span>{msg.message}</span>{" "}
            <small style={{ color: "#999" }}>({msg.time})</small>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={{ width: "80%" }}
        />
        <button onClick={sendMessage} style={{ width: "18%", marginLeft: "2%" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default PublicChat;
