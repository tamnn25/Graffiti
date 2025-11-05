import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PublicChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const wsRef = useRef(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // WebSocket connection
  useEffect(() => {
    let ws = new WebSocket("wss://yahoo-app.onrender.com/chat/ws");
    wsRef.current = ws;

    ws.onopen = () => console.log("✅ Connected to chat server");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "history") {
          const history = data.messages.map((m) => ({
            text: m.message,
            sender: m.username,
            time: new Date(m.timestamp).toLocaleTimeString(),
          }));
          setMessages(history);
        } else if (data.type === "chat") {
          const m = data.message;
          setMessages((prev) => [
            ...prev,
            {
              text: m.message,
              sender: m.username,
              time: new Date(m.timestamp).toLocaleTimeString(),
            },
          ]);
        }
      } catch (err) {
        console.error("Error parsing WS data:", err);
      }
    };

    ws.onclose = () => {
      console.warn("⚠️ WebSocket closed. Attempting to reconnect...");
      setTimeout(() => {
        if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
          wsRef.current = null;
          setMessages((prev) => [...prev]); // trigger reconnect
        }
      }, 2000);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      ws.close();
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)
      return;

    wsRef.current.send(
      JSON.stringify({
        username: username || "Guest",
        message: input.trim(),
      })
    );
    setInput("");
    inputRef.current?.focus();
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        backgroundColor: "#1e1e1e",
        minHeight: "100dvh", // better mobile viewport handling
        padding: "0.5rem",
      }}
    >
      {/* Chat Container */}
      <div
        className="d-flex flex-column rounded shadow w-100"
        style={{
          backgroundColor: "#2c2c2c",
          maxWidth: "800px",
          height: "90dvh",
          display: "flex",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
          <h5 className="mb-0 text-white">💬 Public Chat</h5>
          <button
            className="btn btn-outline-light btn-sm px-3"
            onClick={() => navigate("/")}
          >
            ← Home
          </button>
        </div>

        {/* Username input */}
        <div className="p-3 border-bottom border-secondary">
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary rounded-pill"
            placeholder="Enter your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Chat messages */}
        <div
          className="flex-grow-1 overflow-auto p-3"
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            scrollBehavior: "smooth",
          }}
        >
          {messages.length === 0 ? (
            <p className="text-center text-muted mt-3">
              No messages yet. Start chatting!
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 mb-2 rounded ${
                  msg.sender === username
                    ? "bg-primary text-white ms-auto"
                    : "bg-secondary text-white me-auto"
                }`}
                style={{
                  maxWidth: "80%",
                  wordBreak: "break-word",
                }}
              >
                <div className="d-flex justify-content-between align-items-end">
                  <span>
                    <strong>{msg.sender}: </strong>
                    {msg.text}
                  </span>
                  <small
                    className="ms-2 text-light"
                    style={{ fontSize: "10px", opacity: 0.7 }}
                  >
                    {msg.time}
                  </small>
                </div>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="d-flex p-2 border-top border-secondary"
          style={{
            gap: "0.5rem",
            backgroundColor: "#2c2c2c",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="form-control bg-dark text-white border-secondary rounded-pill"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ fontSize: "15px" }}
          />
          <button
            type="submit"
            className="btn btn-success rounded-pill px-3"
            disabled={!input.trim()}
          >
            Send
          </button>
        </form>
      </div>

      {/* Extra Mobile Styles */}
      <style>
        {`
          @media (max-width: 600px) {
            .rounded-pill, input, button {
              font-size: 14px !important;
            }
            h5 { font-size: 1rem !important; }
            .p-3, .p-2 {
              padding: 0.75rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PublicChat;
