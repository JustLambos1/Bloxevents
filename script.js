document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chat");
  const input = document.getElementById("message");
  const send = document.getElementById("send");

  const WORKER_URL = "https://bloxgang-ai.adhirajsingh648.workers.dev";

  if (!chat || !input || !send) {
    alert("Chat elements not found. Check your HTML IDs.");
    return;
  }

  send.type = "button";

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = "message " + sender;
    msg.style.margin = "12px 0";
    msg.style.padding = "12px 16px";
    msg.style.borderRadius = "14px";
    msg.style.maxWidth = "80%";
    msg.style.wordWrap = "break-word";
    msg.style.whiteSpace = "pre-wrap";

    if (sender === "user") {
      msg.style.background = "#2b6cff";
      msg.style.marginLeft = "auto";
      msg.style.color = "white";
    } else {
      msg.style.background = "rgba(255,255,255,0.08)";
      msg.style.color = "white";
    }

    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
    return msg;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const thinking = addMessage("Thinking...", "ai");

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const reply =
        data.reply ||
        data.response ||
        data.output ||
        data.text ||
        data.message ||
        "No response from AI.";

      thinking.textContent = reply;
    } catch (error) {
      thinking.textContent = "Error: could not reach the AI.";
      console.error("Fetch error:", error);
    }
  }

  send.addEventListener("click", sendMessage);

  send.addEventListener(
    "touchend",
    (e) => {
      e.preventDefault();
      sendMessage();
    },
    { passive: false }
  );

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
