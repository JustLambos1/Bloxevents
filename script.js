document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chat");
  const input = document.getElementById("message");
  const send = document.getElementById("send");

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
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    const thinking = document.createElement("div");
    thinking.className = "message ai";
    thinking.textContent = "Thinking...";
    thinking.style.margin = "12px 0";
    thinking.style.padding = "12px 16px";
    thinking.style.borderRadius = "14px";
    thinking.style.background = "rgba(255,255,255,0.08)";
    thinking.style.color = "white";

    chat.appendChild(thinking);
    chat.scrollTop = chat.scrollHeight;
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
