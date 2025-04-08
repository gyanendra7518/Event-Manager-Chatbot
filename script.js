const chatFlows = {
    welcome: {
      message: "Hi! I’m Event Master, your assistant for tickets, schedule, venue info, and refunds. How can I help you?",
      quickReplies: ["Buy Tickets", "Event Schedule", "Venue Info", "Request Refund"]
    },
    buyTickets: {
      message: "Which event are you interested in?",
      quickReplies: ["Concert A", "Conference B", "Play C"]
    },
    eventSchedule: {
      message: "Here’s the schedule:\n- Concert A: 6 PM\n- Conference B: 10 AM\n- Play C: 8 PM",
      quickReplies: ["Back to Menu"]
    },
    venueInfo: {
      message: "All events are at City Arena, Downtown. Free parking and wheelchair access available.",
      quickReplies: ["Back to Menu"]
    },
    requestRefund: {
      message: "Please provide your ticket ID or the email used for booking.",
      quickReplies: []
    },
    fallback: {
      message: "I didn’t understand that. Please choose an option or rephrase.",
      quickReplies: ["Buy Tickets", "Event Schedule", "Venue Info", "Request Refund"]
    }
  };
  
  function appendMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}-message`;
    msg.innerText = text;
    document.getElementById("chat-messages").appendChild(msg);
    document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
  }
  
  function appendQuickReplies(replies) {
    const container = document.getElementById("quick-replies");
    container.innerHTML = "";
    replies.forEach(reply => {
      const btn = document.createElement("div");
      btn.className = "quick-reply";
      btn.innerText = reply;
      btn.onclick = () => handleUserInput(reply);
      container.appendChild(btn);
    });
  }
  
  function handleUserInput(input) {
    appendMessage(input, "user");
  
    const linput = input.toLowerCase();
    if (linput.includes("buy")) {
      appendMessage(chatFlows.buyTickets.message, "bot");
      appendQuickReplies(chatFlows.buyTickets.quickReplies);
    } else if (["concert a", "conference b", "play c"].includes(linput)) {
      appendMessage(`Great choice! Buy tickets for ${input} at www.eventmaster.com/tickets`, "bot");
      appendQuickReplies(["Back to Menu"]);
    } else if (linput.includes("schedule")) {
      appendMessage(chatFlows.eventSchedule.message, "bot");
      appendQuickReplies(chatFlows.eventSchedule.quickReplies);
    } else if (linput.includes("venue")) {
      appendMessage(chatFlows.venueInfo.message, "bot");
      appendQuickReplies(chatFlows.venueInfo.quickReplies);
    } else if (linput.includes("refund")) {
      appendMessage(chatFlows.requestRefund.message, "bot");
      appendQuickReplies(chatFlows.requestRefund.quickReplies);
    } else if (linput.includes("back")) {
      appendMessage(chatFlows.welcome.message, "bot");
      appendQuickReplies(chatFlows.welcome.quickReplies);
    } else {
      appendMessage(chatFlows.fallback.message, "bot");
      appendQuickReplies(chatFlows.fallback.quickReplies);
    }
  }
  
  function sendMessage() {
    const input = document.getElementById("user-input").value.trim();
    if (input) {
      handleUserInput(input);
      document.getElementById("user-input").value = "";
    }
  }
  
  function submitUserInfo() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
  
    if (!name || !email) {
      alert("Please enter both name and email.");
      return;
    }
  
    document.getElementById("user-info-form").style.display = "none";
    document.querySelector(".chat-container").style.display = "flex";
  
    appendMessage(`Hi ${name}, welcome to Event Master!`, "bot");
    appendMessage(chatFlows.welcome.message, "bot");
    appendQuickReplies(chatFlows.welcome.quickReplies);
  
    // 🔄 Send to backend
    fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    }).catch(err => console.error("Backend error:", err));
  }
  
  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") sendMessage();
  });
  